import { FunctionComponent } from "react"
import ActionButton from "~/components/action-button/action-button"
import { className } from "~/utils/class-names/class-name"
import { Props as ActionButtonProps } from "./action-button"
import styles from "./radio-action-button.module.sass"

interface Props extends ActionButtonProps {
	active?: boolean
}

const RadioActionButton: FunctionComponent<Props> = props => {
	const isActive = props.active ?? true
	return (
		<ActionButton
			className={className(styles.button, isActive && styles.active)}
			symbolClassName={styles.symbol}
			textClassName={styles.text}
			{...props}
		/>
	)
}

export default RadioActionButton
