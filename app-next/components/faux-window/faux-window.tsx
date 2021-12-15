import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./faux-window.module.sass"

interface Props extends PropsWithAnyChildren, PropsWithClassName {
	title?: string
	controls?: boolean
}

const FauxWindow: FunctionComponent<Props> = props => (
	<div className={className(styles.window, props.className)}>
		<header>
			<div className={className(styles.controls, props.controls && styles.hasEnabledControls)}>
				<div className={className(styles.control, styles.close)} />
				<div className={className(styles.control, styles.minimize)} />
				<div className={className(styles.control, styles.zoom)} />
			</div>
			<div className={styles.title}>{props.title ?? ""}</div>
		</header>
		<main>{props.children}</main>
	</div>
)

export default FauxWindow
