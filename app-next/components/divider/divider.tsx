import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./divider.module.sass"

const Divider: FunctionComponent<PropsWithClassName> = props => (
	<div className={className(styles.divider, props.className)}></div>
)

export default Divider
