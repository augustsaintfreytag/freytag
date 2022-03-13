import React, { FunctionComponent, useEffect } from "react"
import { useInputState } from "~/components/input/input-state/functions/input-state-hook"
import { usePageEvent } from "~/components/page-event/functions/page-event-hook"
import { useAutoResettingState } from "~/components/state/functions/auto-resetting-state-hook"
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
	onFocus?: () => void
	onBlur?: (event: React.FocusEvent<HTMLElement>) => void
}

export function InputHighlightEvent(): Event {
	return new Event("inputHighlight")
}

const InputTextField: FunctionComponent<Props> = props => {
	const { inputRef, inputIsValid, onInputChange, inputContext, setInputIsUsed } = useInputState<HTMLInputElement>(props.setValue)
	const [isHighlighting, setIsHighlighting] = useAutoResettingState(false)

	useEffect(() => {
		if (!inputIsValid) {
			setIsHighlighting(true)
		}
	}, [inputIsValid])

	usePageEvent("validateInputs", () => {
		setInputIsUsed(true)
		setIsHighlighting(true)
	})

	const inputClassName = className(
		styles.block,
		props.readOnly && styles.isReadOnly,
		inputIsValid && styles.isValid,
		isHighlighting && styles.isHighlighting,
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
