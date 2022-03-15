import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./menu.module.sass"

interface Props extends PropsWithAnyChildren, PropsWithClassName {}

const Menu: FunctionComponent<Props> = props => (
	<menu className={className(styles.menu, props.className)}>
		<div className={styles.inlay}>{props.children}</div>
	</menu>
)

export default Menu
