import { Theme } from "~/api/records/themes/library/theme"
import { Props as ThemePreviewProps } from "~/components/themes/theme-preview/components/theme-preview"
import { colorFromHex } from "~/utils/colors/functions/color-conversion"
import { Color } from "~/utils/colors/models/color"

export function themePreviewPropsFromTheme(theme: Theme): ThemePreviewProps {
	return {
		name: theme.name,
		description: theme.description,
		colors: colorCollectionFromTheme(theme),
		link: {
			id: theme._id
		}
	}
}

function colorCollectionFromTheme(theme: Theme): Color[] {
	const hexColorDescriptions = JSON.parse(theme.colors) as string[]
	const colors = hexColorDescriptions
		.map(description => {
			const color = colorFromHex(description)

			if (!color) {
				console.warn(`Could not decode hex color description '${description}' to color.`)
				return undefined
			}

			return color
		})
		.filter(color => color) as Color[]

	return colors
}
