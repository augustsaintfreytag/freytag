import { FunctionComponent } from "react"
import { useInputState } from "~/components/input/input-state/functions/input-state-hook"
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

const InputTextField: FunctionComponent<Props> = props => {
	const { inputRef, inputIsValid, inputOnChange, inputContext } = useInputState<HTMLInputElement>(props.setValue)
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
