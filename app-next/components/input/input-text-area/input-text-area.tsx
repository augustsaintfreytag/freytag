import { FunctionComponent } from "react"
import { className } from "~/utils/class-names/class-name"
import InputEnclosure from "../input-enclosure/input-enclosure"
import { Props as RawProps } from "../input-text-field/input-text-field"
import styles from "./input-text-area.module.sass"

type Props = RawProps

const InputTextArea: FunctionComponent<Props> = props => (
	<InputEnclosure className={className(styles.block, props.className)} name={props.name}>
		<textarea
			placeholder={props.placeholder}
			value={props.value}
			onChange={event => {
				const newValue = event.target.value
				props.setValue?.(newValue)
			}}
		/>
	</InputEnclosure>
)

export default InputTextArea
