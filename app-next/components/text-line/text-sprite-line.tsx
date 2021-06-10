import { FunctionComponent } from "react"
import Sprite, { SpriteReference } from "~/components/sprites/sprite"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./text-sprite-line.module.sass"

interface Props extends PropsWithAnyChildren {
	sprite: SpriteReference
}

const TextSpriteLine: FunctionComponent<Props> = props => (
	<div className={styles.line}>
		<Sprite className={styles.sprite} href={props.sprite} />
		<span className={styles.content}>{props.children}</span>
	</div>
)

export default TextSpriteLine
