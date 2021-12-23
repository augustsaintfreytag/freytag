import { FunctionComponent } from "react"
import Sprite, { SpriteReference } from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./action-button.module.sass"

export interface Props extends PropsWithClassName {
	symbol?: SpriteReference
	text?: string
	title?: string
	onClick?: () => void
	symbolClassName?: string
	textClassName?: string
}

const ActionButton: FunctionComponent<Props> = props => {
	const isDecorated = props.symbol ?? false

	return (
		<button
			className={className(styles.button, isDecorated ? styles.decorated : styles.undecorated, props.className)}
			title={props.title}
			onClick={() => props.onClick?.()}
		>
			{props.symbol && <Sprite className={className(styles.symbol, props.symbolClassName)} href={props.symbol} />}
			<div className={className(styles.text, props.textClassName)}>{props.text}</div>
		</button>
	)
}

export default ActionButton
