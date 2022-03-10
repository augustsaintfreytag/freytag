import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import InputEnclosure from "../input-enclosure/input-enclosure"
import styles from "./input-text-field.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	placeholder?: string
	value?: string
	setValue?: (value: string) => void
	pattern?: string
	maxLength?: number
	readOnly?: boolean
	onFocus?: () => void
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const InputTextField: FunctionComponent<Props> = props => (
	<InputEnclosure className={className(styles.block, props.className)} name={props.name}>
		<input
			id={props.name}
			type="text"
			value={props.value}
			placeholder={props.placeholder}
			onChange={event => {
				const newValue = event.target.value
				props.setValue?.(newValue)
			}}
			pattern={props.pattern}
			maxLength={props.maxLength}
			readOnly={props.readOnly}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
		/>
	</InputEnclosure>
)

export default InputTextField
