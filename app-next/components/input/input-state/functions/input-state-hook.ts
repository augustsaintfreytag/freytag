import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { descriptionForInputValidity } from "~/components/input/input-state/functions/input-formatting"
import { usePageEvent } from "~/components/page-event/functions/page-event-hook"
import { useAutoResettingState } from "~/components/state/functions/auto-resetting-state-hook"
import { TimeInterval } from "~/utils/date/library/intervals"

type SetValueBlock = (newValue: string) => void

const userInputValidationDelay: TimeInterval = 500

export function useInputState<InputElement extends HTMLInputElement | HTMLTextAreaElement>(setValue?: SetValueBlock) {
	const inputRef = useRef<InputElement>(null)

	const [inputIsUsed, setInputIsUsed] = useState(false)
	const [inputIsValid, setInputIsValid] = useState(true)
	const inputValidity = inputRef.current?.validity
	const setInputIsUsedOnInput = useDebouncedCallback(() => setInputIsUsed(true), userInputValidationDelay)

	const onInputChange = (event: React.ChangeEvent<InputElement>) => {
		const newValue = event.target.value
		setValue?.(newValue)

		setInputIsUsedOnInput()
	}

	useEffect(() => {
		if (!inputIsUsed) {
			return
		}

		setInputIsValid(inputValidity?.valid ?? true)
	}, [inputValidity?.valid, inputIsUsed])

	const inputContext = inputContextDescriptionForState(inputValidity, inputIsUsed)

	return {
		inputRef,
		inputIsValid,
		inputIsUsed,
		setInputIsUsed,
		onInputChange,
		inputContext
	}
}

export function useInputStateWithHighlight<InputElement extends HTMLInputElement | HTMLTextAreaElement>(setValue?: SetValueBlock) {
	const inputState = useInputState<InputElement>(setValue)
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
