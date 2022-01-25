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
import styles from "./theme-color-collection.module.sass"

// Configuration

const colorChangeDebounceTime: TimeInterval = 20

// Collection

interface Props extends PropsWithClassName {
	colors: Color[]
	setColor?: (index: number, color: Color) => void
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
	const colorInput = useRef<HTMLInputElement>(null)
	const colorButtons = range(0, colors.length).map(() => useRef<HTMLButtonElement>(null))

	if (colors.length !== labels.length) {
		console.warn(`Expected exactly ${labels.length} colors, but got ${colors.length}. Need exact number of colors for mapping.`)
	}

	const [colorInputIndex, setColorInputIndex] = useState<number | undefined>(undefined)
	const [colorInputValue, setColorInputValue] = useState<string>("")

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
		const button = colorButtons[index].current
		const input = colorInput.current

		if (!button || !input) {
			console.error(`Could not position and show color input, missing element references.`)
			return
		}

		const positionTarget = button.parentElement!
		const colorBounds = {
			x: positionTarget.offsetLeft,
			y: positionTarget.offsetTop,
			width: positionTarget.clientWidth,
			height: positionTarget.clientHeight
		}

		const inputVerticalOffset = 5
		const inputDummyHeight = input.clientHeight
		const colorPosition = { x: colorBounds.x, y: colorBounds.y + colorBounds.height - inputDummyHeight + inputVerticalOffset }

		input.style.inset = `${colorPosition.y}px 0 0 ${colorPosition.x}px`
		input.style.width = `${colorBounds.width}px`

		requestAnimationFrame(() => {
			input.focus()
			input.click()
		})
	}

	const onColorAction = (index: number) => {
		setColorInputIndex(index)
		setColorInputValue(colors[index].hex)

		focusColorInput(index)
	}

	const onColorInputChange = (value: string) => setColorInputValue(value)

	return (
		<section className={className(styles.collection, props.className)}>
			<ol>
				{range(0, 10).map(index => {
					const [color, label] = mappedColorAndLabel(colors, labels, index)

					return (
						<li key={`${index}-${label}`}>
							<ThemeColorCollectionItem color={color} label={label} light={color.isLight} />
							<button className={styles.edit} ref={colorButtons[index]} onClick={_ => onColorAction(index)}></button>
						</li>
					)
				})}
			</ol>
			<input
				type="color"
				ref={colorInput}
				className={styles.colorInput}
				value={colorInputValue}
				onChange={event => onColorInputChange(event.target.value)}
			/>
		</section>
	)
}

export default ThemeColorCollection
