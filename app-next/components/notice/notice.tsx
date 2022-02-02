import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import Sprite from "../sprites/sprite"
import styles from "./notice.module.sass"

interface Props extends PropsWithAnyChildren, PropsWithClassName {}

const Notice: FunctionComponent<Props> = props => (
	<section className={className(styles.notice, props.className)}>
		<Sprite className={styles.symbol} href="#Warning Symbol" />
		<div className={styles.inlay}>{props.children}</div>
	</section>
)

export default Notice
