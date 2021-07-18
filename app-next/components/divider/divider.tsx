import { CSSProperties, FunctionComponent } from "react"
import { ColorValue } from "~/api/common/library/color-value"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./divider.module.sass"

interface Props extends PropsWithClassName {
	color?: ColorValue
}

const Divider: FunctionComponent<Props> = props => {
	const style: CSSProperties = {}

	if (props.color) {
		style.backgroundColor = props.color
	}

	return <div className={className(styles.divider, props.className)} style={{ backgroundColor: props.color }}></div>
}

export default Divider
