import { FunctionComponent, useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { descriptionForInputValidity } from "~/components/input/input-state/functions/input-formatting"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import InputEnclosure from "../input-enclosure/input-enclosure"
import styles from "./input-text-field.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	placeholder?: string
	hint?: string
	value?: string
	setValue?: (value: string) => void
	required?: boolean
	pattern?: string
	minLength?: number
	maxLength?: number
	readOnly?: boolean
	onFocus?: () => void
	onBlur?: (event: React.FocusEvent<HTMLElement>) => void
}

function inputContextDescriptionForState(state: ValidityState | undefined, isUsed: boolean): string | undefined {
	if (!state || !isUsed) {
		return undefined
	}

	return descriptionForInputValidity(state)
}

const InputTextField: FunctionComponent<Props> = props => {
	const inputRef = useRef<HTMLInputElement>(null)

	const [inputIsUsed, setInputIsUsed] = useState(false)
	const [inputIsValid, setInputIsValid] = useState(true)
	const inputValidity = inputRef.current?.validity
	const setInputIsUsedOnInput = useDebouncedCallback(() => setInputIsUsed(true), 500)

	const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value
		props.setValue?.(newValue)

		setInputIsUsedOnInput()
	}

	useEffect(() => {
		if (!inputIsUsed) {
			return
		}

		setInputIsValid(inputValidity?.valid ?? true)
	}, [inputValidity?.valid, inputIsUsed])

	const inputContext = inputContextDescriptionForState(inputValidity, inputIsUsed)
	const inputClassName = className(styles.block, props.readOnly && styles.isReadOnly, inputIsValid && styles.isValid, props.className)

	return (
		<InputEnclosure className={inputClassName} name={props.name} context={inputContext}>
			<input
				ref={inputRef}
				id={props.name}
				type="text"
				value={props.value}
				onChange={inputOnChange}
				placeholder={props.placeholder}
				required={props.required}
				pattern={props.pattern}
				minLength={props.minLength}
				maxLength={props.maxLength}
				readOnly={props.readOnly}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
			/>
		</InputEnclosure>
	)
}

export default InputTextField
