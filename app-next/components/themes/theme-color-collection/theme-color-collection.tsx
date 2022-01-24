import { FunctionComponent } from "react"
import { themeColorNames } from "~/components/themes/theme-color-collection/library/theme-color-labels"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { range } from "~/utils/range/range"
import ThemeColorCollectionItem from "./components/theme-color-collection-item"
import styles from "./theme-color-collection.module.sass"

// Collection

interface Props extends PropsWithClassName {
	colors: Color[]
}

function mappedColorAndLabel(colors: Color[], labels: string[], index: number): [color: Color, label: string] {
	const color = colors[index]
	const label = labels[index] ?? "<None>"

	if (!color) {
		return [Color.placeholder, label]
	}

	return [color, label]
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
					const [color, label] = mappedColorAndLabel(colors, labels, index)

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
