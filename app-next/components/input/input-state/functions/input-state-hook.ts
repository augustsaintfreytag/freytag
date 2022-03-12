import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { descriptionForInputValidity } from "~/components/input/input-state/functions/input-formatting"

function inputContextDescriptionForState(state: ValidityState | undefined, isUsed: boolean): string | undefined {
	if (!state || !isUsed) {
		return undefined
	}

	return descriptionForInputValidity(state)
}

type SetValueBlock = (newValue: string) => void

export function useInputState(setValue?: SetValueBlock) {
	const inputRef = useRef<HTMLInputElement>(null)

	const [inputIsUsed, setInputIsUsed] = useState(false)
	const [inputIsValid, setInputIsValid] = useState(true)
	const inputValidity = inputRef.current?.validity
	const setInputIsUsedOnInput = useDebouncedCallback(() => setInputIsUsed(true), 500)

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
		inputOnChange: onInputChange,
		inputContext
	}
}
