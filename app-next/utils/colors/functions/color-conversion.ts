import { Color } from "~/utils/colors/models/color"

// Hexadecimal

function valueFromHexDescription(value: string): number {
	return parseInt(value, 16) / 255
}

export function colorFromHex(value: string): Color | undefined {
	const components = value.match(/.{1,2}/g) ?? []

	if (components.length !== 3) {
		return undefined
	}

	const red = valueFromHex(components[0])
	const green = valueFromHex(components[1])
	const blue = valueFromHex(components[2])

	return new Color(red, green, blue)
}
