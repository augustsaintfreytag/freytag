import { FunctionComponent } from "react"
import ActionButton from "~/components/action-button/action-button"
import { SpriteReference } from "~/components/sprites/sprite"
import { className } from "~/utils/class-names/class-name"
import styles from "./radio-action-button.module.sass"

interface Props {
	symbol?: SpriteReference
	text?: string
	onClick?: () => void
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
