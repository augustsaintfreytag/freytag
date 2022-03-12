import { FunctionComponent } from "react"
import { useInputState } from "~/components/input/input-state/functions/input-state-hook"
import { className } from "~/utils/class-names/class-name"
import InputEnclosure from "../input-enclosure/input-enclosure"
import { Props as RawProps } from "../input-text-field/input-text-field"
import styles from "./input-text-area.module.sass"

type Props = RawProps

const InputTextArea: FunctionComponent<Props> = props => {
	const { inputRef, inputIsValid, inputOnChange, inputContext } = useInputState<HTMLTextAreaElement>(props.setValue)
	const inputClassName = className(styles.block, props.readOnly && styles.isReadOnly, inputIsValid && styles.isValid, props.className)

	return (
		<InputEnclosure className={inputClassName} name={props.name} context={inputContext}>
			<textarea
				ref={inputRef}
				id={props.name}
				placeholder={props.placeholder}
				value={props.value}
				onChange={inputOnChange}
				required={props.required}
				minLength={props.minLength}
				maxLength={props.maxLength}
				readOnly={props.readOnly}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
			/>
		</InputEnclosure>
	)
}

export default InputTextArea
