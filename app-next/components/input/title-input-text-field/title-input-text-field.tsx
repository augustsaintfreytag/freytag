import { FunctionComponent } from "react"
import { className } from "~/utils/class-names/class-name"
import InputTextField, { Props as RawProps } from "../input-text-field/input-text-field"
import styles from "./title-input-text-field.module.sass"

type Props = RawProps

const TitleInputTextField: FunctionComponent<Props> = props => (
	<InputTextField
		className={className(styles.block, props.className)}
		name={props.name}
		placeholder={props.placeholder}
		value={props.value}
		setValue={props.setValue}
		required={props.required}
		minLength={props.minLength}
		maxLength={props.maxLength}
		pattern={props.pattern}
		onValidation={props.onValidation}
		onFocus={props.onFocus}
		onBlur={props.onBlur}
	/>
)

export default TitleInputTextField
