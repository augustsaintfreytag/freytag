import { Color } from "~/utils/colors/models/color"

// Encoded Hexadecimal

export function colorsFromEncodedData(data: string): Color[] | undefined {
	const colorDescriptions = JSON.parse(data)
	if (!isEncodedColorCollection(colorDescriptions)) {
		return undefined
	}

	const colors = colorDescriptions
		.map(description => {
			const color = colorFromHexDescription(description)

			if (!color) {
				console.warn(`Could not decode hex color description '${description}' to color.`)
				return undefined
			}

			return color
		})
		.filter(color => color) as Color[]

	return colors
}

function isEncodedColorCollection(value: any): value is string[] {
	return Array.isArray(value) && value.every(element => typeof element === "string")
}

// Hexadecimal

function colorExpressionFromHexDescription(value: string): number {
	return parseInt(value, 16) / 255
}

export function colorFromHexDescription(value: string): Color | undefined {
	const components = value.replace("#", "").match(/.{1,2}/g) ?? []

	if (components.length !== 3) {
		return undefined
	}

	const red = colorExpressionFromHexDescription(components[0])
	const green = colorExpressionFromHexDescription(components[1])
	const blue = colorExpressionFromHexDescription(components[2])

	return new Color(red, green, blue)
}

// Cockpit Value

const colorValueMatchExpression = new RegExp("rgb\\((\\d+), ?(\\d+), ?(\\d+)\\)")

function valueFromIntegerDescription(value: string | undefined): number {
	return parseInt(value ?? "", 10) / 255
}

export function colorFromRGBDescription(value: string): Color | undefined {
	const components = colorValueMatchExpression.exec(value)
	const redComponent = components?.[1]
	const greenComponent = components?.[2]
	const blueComponent = components?.[3]

	const red = valueFromIntegerDescription(redComponent)
	const green = valueFromIntegerDescription(greenComponent)
	const blue = valueFromIntegerDescription(blueComponent)

	if (!red || !green || !blue) {
		return undefined
	}

	return new Color(red, green, blue)
}
