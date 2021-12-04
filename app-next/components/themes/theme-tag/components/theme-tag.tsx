import { FunctionComponent } from "react"
import Sprite, { SpriteReference } from "~/components/sprites/sprite"
import styles from "./theme-tag.module.sass"

export interface Props {
	name: string
	symbol: SpriteReference
}

const ThemeTag: FunctionComponent<Props> = props => (
	<div className={styles.tag}>
		<Sprite className={styles.symbol} href={props.symbol} />
		<div className={styles.name}>{props.name}</div>
	</div>
)

export default ThemeTag
