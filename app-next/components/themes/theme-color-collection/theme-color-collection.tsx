import { FunctionComponent, useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { themeColorNames } from "~/components/themes/theme-color-collection/library/theme-color-labels"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { colorFromHexDescription } from "~/utils/colors/functions/color-conversion"
import { Color } from "~/utils/colors/models/color"
import { TimeInterval } from "~/utils/date/library/intervals"
import { range } from "~/utils/range/range"
import ThemeColorCollectionItem from "./components/theme-color-collection-item"
import { focusColorInputOnEventSource } from "./functions/color-input-actions"
import styles from "./theme-color-collection.module.sass"

// Configuration

const colorChangeDebounceTime: TimeInterval = 20

// Collection

interface Props extends PropsWithClassName {
	colors: Color[]
	setColor?: (index: number, color: Color) => void
	editable?: boolean
	compact?: boolean
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

	const colorInput = useRef<HTMLInputElement>(null)
	const colorButtons = range(0, colors.length).map(() => useRef<HTMLButtonElement>(null))
	const [colorInputIndex, setColorInputIndex] = useState<number | undefined>(undefined)
	const [colorInputValue, setColorInputValue] = useState<string>(Color.white.hex)

	useEffect(
		useDebouncedCallback(() => {
			if (colorInputIndex === undefined) {
				return
			}

			const newColor = colorFromHexDescription(colorInputValue)!
			props.setColor?.(colorInputIndex, newColor)
		}, colorChangeDebounceTime),
		[colorInputValue]
	)

	const focusColorInput = (index: number) => {
		const input = colorInput
		const button = colorButtons[index]

		focusColorInputOnEventSource(input, button)
	}

	const onColorAction = (index: number) => {
		setColorInputIndex(index)
		setColorInputValue(colors[index].hex)

		focusColorInput(index)
	}

	const onColorInputChange = (value: string) => setColorInputValue(value)

	return (
		<div className={className(styles.collection, props.editable ?? styles.isEditable, props.compact && styles.isCompact, props.className)}>
			<ol>
				{range(0, 10).map(index => {
					const [color, label] = mappedColorAndLabel(colors, labels, index)

					return (
						<li key={`${index}-${label}`}>
							<ThemeColorCollectionItem color={color} label={label} light={color.isLight} />
							{props.editable && <button className={styles.edit} ref={colorButtons[index]} onClick={_ => onColorAction(index)}></button>}
						</li>
					)
				})}
			</ol>
			{props.editable && (
				<input
					type="color"
					ref={colorInput}
					className={styles.colorInput}
					value={colorInputValue}
					onChange={event => onColorInputChange(event.target.value)}
				/>
			)}
		</div>
	)
}

export default ThemeColorCollection
