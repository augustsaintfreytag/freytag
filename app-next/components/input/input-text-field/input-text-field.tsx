import React, { FunctionComponent } from "react"
import { useInputStateWithHighlight } from "~/components/input/input-state/functions/input-state-hook"
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
	highlighted?: boolean
	required?: boolean
	pattern?: string
	minLength?: number
	maxLength?: number
	readOnly?: boolean
	onValidation?: (state: boolean) => void
	onFocus?: () => void
	onBlur?: (event: React.FocusEvent<HTMLElement>) => void
}

export function InputHighlightEvent(): Event {
	return new Event("inputHighlight")
}

const InputTextField: FunctionComponent<Props> = props => {
	const { inputRef, inputIsValid, onInputChange, inputContext, inputIsHighlighting } = useInputStateWithHighlight<HTMLInputElement>(
		props.setValue,
		props.onValidation
	)

	const inputClassName = className(
		styles.block,
		props.readOnly && styles.isReadOnly,
		inputIsValid && styles.isValid,
		inputIsHighlighting && styles.isHighlighting,
		props.className
	)

	return (
		<InputEnclosure className={inputClassName} name={props.name} context={inputContext}>
			<input
				ref={inputRef}
				id={props.name}
				type="text"
				value={props.value}
				onChange={onInputChange}
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
