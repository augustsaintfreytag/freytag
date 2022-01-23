import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./input-text-field.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	placeholder?: string
	value?: string
	setValue?: (value: string) => void
}

const InputTextField: FunctionComponent<Props> = props => (
	<div className={className(styles.block, props.className)}>
		<input
			id={props.name}
			type="text"
			value={props.value}
			placeholder={props.placeholder}
			onChange={event => {
				const newValue = event.target.value
				props.setValue?.(newValue)
			}}
		/>
		<label htmlFor={props.name}>{props.name}</label>
	</div>
)

export default InputTextField
