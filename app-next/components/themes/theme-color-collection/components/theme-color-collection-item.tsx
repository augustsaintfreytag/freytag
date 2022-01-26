import { FunctionComponent } from "react"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./theme-color-collection-item.module.sass"

interface Props {
	color: Color
	label: string
	light?: boolean
}

const ThemeColorCollectionItem: FunctionComponent<Props> = props => {
	const style = propertiesWithStyleVariables({ fillColor: props.color.rgb })
	const colorIsLight = props.light ?? false
	const colorIsWhite = props.color.rgb === Color.white.rgb

	return (
		<div className={className(styles.item, colorIsLight && styles.isLight, colorIsWhite && styles.isWhite)} style={style}>
			<div className={styles.inlay}>
				<div className={styles.value}>{props.color.hex}</div>
				<div className={styles.label}>{props.label}</div>
			</div>
		</div>
	)
}

export default ThemeColorCollectionItem
