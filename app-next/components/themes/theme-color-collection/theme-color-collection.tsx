import { FunctionComponent } from "react"
import { themeColorNames } from "~/components/themes/theme-color-collection/library/theme-color-labels"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { range } from "~/utils/range/range"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./theme-color-collection.module.sass"

// Item

interface ItemProps {
	color: Color
	label: string
	light?: boolean
}

const ThemeColorCollectionItem: FunctionComponent<ItemProps> = props => {
	const style = propertiesWithStyleVariables({ fillColor: props.color.rgb })

	return (
		<div className={className(styles.item, props.light && styles.isLight)} style={style}>
			<div className={styles.inlay}>
				<div className={styles.value}>{props.color.hex}</div>
				<div className={styles.label}>{props.label}</div>
			</div>
		</div>
	)
}

// Collection

interface Props extends PropsWithClassName {
	colors: Color[]
}

const ThemeColorCollection: FunctionComponent<Props> = props => {
	const colors = props.colors
	const labels = themeColorNames

	if (colors.length !== labels.length) {
		console.warn(`Expected exactly ${labels.length} colors, but got ${colors.length}. Need exact number of colors for mapping.`)
	}

	return (
		<section className={className(styles.collection, props.className)}>
			<ol>
				{range(0, 10).map(index => {
					const [color, label] = (() => {
						const color = colors[index]
						const label = labels[index] ?? "<None>"

						if (!color) {
							return [Color.placeholder, label]
						}

						return [color, label]
					})()

					return (
						<li key={`${index}-${color.key}-${label}`}>
							<ThemeColorCollectionItem color={color} label={label} light={color.isLight} />
						</li>
					)
				})}
			</ol>
		</section>
	)
}

export default ThemeColorCollection
