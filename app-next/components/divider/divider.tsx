import { FunctionComponent } from "react"
import { ColorValue } from "~/api/common/library/color-value"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./divider.module.sass"

interface Props extends PropsWithClassName {
	color?: ColorValue
}

const Divider: FunctionComponent<Props> = props => {
	const style = propertiesWithStyleVariables({ accentColor: props.color })
	return <div className={className(styles.divider, props.className)} style={style}></div>
}

export default Divider
