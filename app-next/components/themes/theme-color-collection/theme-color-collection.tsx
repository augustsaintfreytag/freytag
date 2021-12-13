import { FunctionComponent } from "react"
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
}

const ThemeColorCollectionItem: FunctionComponent<ItemProps> = props => {
	const style = propertiesWithStyleVariables({ fillColor: props.color.rgb })

	return (
		<div className={styles.item} style={style}>
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
	labels: string[]
}

const ThemeColorCollection: FunctionComponent<Props> = props => {
	const { colors, labels } = props

	return (
		<section className={className(styles.collection, props.className)}>
			<ol>
				{range(0, 10).map(index => {
					const color = colors[index]
					if (!color) {
						return (
							<li key={`${index}-fallback`}>
								<ThemeColorCollectionItem color={Color.placeholder} label="<No Colour>" />
							</li>
						)
					}

					const label = labels[index] ?? "<None>"
					return (
						<li key={`${index}-${color.key}-${label}`}>
							<ThemeColorCollectionItem color={color} label={label} />
						</li>
					)
				})}
			</ol>
		</section>
	)
}

export default ThemeColorCollection
