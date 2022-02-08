import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { ColorDescription } from "~/utils/colors/library/color-description"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./faux-window.module.sass"

interface Props extends PropsWithAnyChildren, PropsWithClassName {
	title?: string
	controls?: boolean
	background?: ColorDescription
}

const FauxWindow: FunctionComponent<Props> = props => {
	const style = propertiesWithStyleVariables({ background: props.background })

	return (
		<div style={style} className={className(styles.window, props.className)}>
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
}

export default FauxWindow
