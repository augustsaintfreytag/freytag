import { FunctionComponent } from "react"
import Sprite, { SpriteReference } from "~/components/sprites/sprite"
import { className } from "~/utils/class-names/class-name"
import styles from "./action-button.module.sass"

interface Props {
	symbol?: SpriteReference
	text?: string
	onClick?: () => void
}

const ActionButton: FunctionComponent<Props> = props => (
	<button className={className(styles.button, props.symbol ? styles.decorated : styles.undecorated)} onClick={() => props.onClick?.()}>
		{props.symbol && <Sprite className={styles.symbol} href={props.symbol} />}
		<div className={styles.text}>{props.text}</div>
	</button>
)

export default ActionButton
