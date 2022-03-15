import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { descriptionForInputValidity } from "~/components/input/input-state/functions/input-formatting"
import { ValidityRepresentation } from "~/components/input/input-state/functions/input-validity-report-hook"
import { usePageEvent } from "~/components/page-event/functions/page-event-hook"
import { useAutoResettingState } from "~/components/state/functions/auto-resetting-state-hook"
import { TimeInterval } from "~/utils/date/library/intervals"

type SetValueBlock = (newValue: string) => void
type SetValidationBlock = (state: ValidityRepresentation) => void

const userInputValidationDelay: TimeInterval = 500

export function useInputState<InputElement extends HTMLInputElement | HTMLTextAreaElement>(onSet?: SetValueBlock, onValidation?: SetValidationBlock) {
	const inputRef = useRef<InputElement>(null)

	const [inputIsUsed, setInputIsUsed] = useState(false)
	const [inputIsValid, setInputIsValid] = useState(true)
	const inputValidity = inputRef.current?.validity
	const setInputIsUsedOnInput = useDebouncedCallback(() => setInputIsUsed(true), userInputValidationDelay)

	// Value Change Block

	const onInputChange = (event: React.ChangeEvent<InputElement>) => {
		const newValue = event.target.value
		onSet?.(newValue)

		setInputIsUsedOnInput()
	}

	// Validation Effect

	useEffect(() => {
		const isValid = inputValidity?.valid ?? true
		onValidation?.(isValid)

		if (!inputIsUsed) {
			return
		}

		setInputIsValid(isValid)
	}, [inputValidity?.valid, inputIsUsed])

	// Description Content

	const inputContext = inputContextDescriptionForState(inputValidity, inputIsUsed)

	return {
		inputRef,
		inputValidity,
		inputIsValid,
		inputIsUsed,
		setInputIsUsed,
		onInputChange,
		inputContext
	}
}

export function useInputStateWithHighlight<InputElement extends HTMLInputElement | HTMLTextAreaElement>(
	onSet?: SetValueBlock,
	onValidation?: SetValidationBlock
) {
	const inputState = useInputState<InputElement>(onSet, onValidation)
	const [inputIsHighlighting, setInputIsHighlighting] = useAutoResettingState(false)

	useEffect(() => {
		if (!inputState.inputIsValid) {
			setInputIsHighlighting(true)
		}
	}, [inputState.inputIsValid])

	usePageEvent("validateInputs", () => {
		inputState.setInputIsUsed(true)
		setInputIsHighlighting(true)
	})

	return { ...inputState, inputIsHighlighting }
}

// Utility

function inputContextDescriptionForState(state: ValidityState | undefined, isUsed: boolean): string | undefined {
	if (!state || !isUsed) {
		return undefined
	}

	return descriptionForInputValidity(state)
}
