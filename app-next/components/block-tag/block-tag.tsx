import { FunctionComponent } from "react"
import { ColorValue } from "~/api/common/library/color-value"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./block-tag.module.sass"

interface Props extends PropsWithClassName {
	name: string
	color?: ColorValue
}

const BlockTag: FunctionComponent<Props> = props => {
	const style = propertiesWithStyleVariables({ accentColor: props.color })

	return (
		<div className={className(styles.tag, props.className)} style={style}>
			{props.name}
		</div>
	)
}

export default BlockTag
