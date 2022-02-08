import { FunctionComponent } from "react"
import { BlockTagAppearance as Appearance } from "~/components/block-tag/library/block-tag-appearance"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { ColorDescription } from "~/utils/colors/library/color-description"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./block-tag.module.sass"

function classNameForAppearance(appearance: Appearance): string {
	switch (appearance) {
		case Appearance.Default:
			return styles.appearanceDefault
		case Appearance.Decorative:
			return styles.appearanceDecorative
		case Appearance.Title:
			return styles.appearanceTitle
	}
}

interface Props extends PropsWithClassName {
	name: string
	color?: ColorDescription
	appearance?: Appearance
}

const BlockTag: FunctionComponent<Props> = props => {
	const appearance = props.appearance ?? Appearance.Default
	const style = propertiesWithStyleVariables({ accentColor: props.color })

	return (
		<div className={className(styles.tag, classNameForAppearance(appearance), props.className)} style={style}>
			{props.name}
		</div>
	)
}

export default BlockTag
