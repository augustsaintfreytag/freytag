import { Theme, ThemeEditorFormat, ThemeLightness, ThemePackage } from "~/api/records/themes/library/theme"
import { Props as ThemePreviewProps } from "~/components/themes/theme-preview/components/theme-preview"
import { Props as ThemeTagProps } from "~/components/themes/theme-tag/components/theme-tag"
import { darkThemeTag, lightThemeTag, universalThemeTag, xcodeThemeTag } from "~/components/themes/theme-tag/functions/theme-tag-models"
import { colorFromHex } from "~/utils/colors/functions/color-conversion"
import { Color } from "~/utils/colors/models/color"

export function themePreviewPropsFromTheme(theme: Theme): ThemePreviewProps {
	return {
		name: theme.name,
		description: theme.description,
		colors: colorCollectionFromTheme(theme),
		tags: themeTagProps(theme),
		link: {
			id: theme._id
		}
	}
}

function themeTagProps(theme: Theme): ThemeTagProps[] {
	const props: ThemeTagProps[] = []

	props.push(themeTagPropsForLightness(theme.lightness))

	for (const themePackageBlock of theme.packages) {
		const packageProps = themeTagPropsForPackage(themePackageBlock.value)
		props.push(packageProps)
	}

	return props
}

function themeTagPropsForLightness(lightness: ThemeLightness): ThemeTagProps {
	switch (lightness) {
		case ThemeLightness.Light:
			return lightThemeTag()
		case ThemeLightness.Dark:
			return darkThemeTag()
	}
}

function themeTagPropsForPackage(themePackage: ThemePackage): ThemeTagProps {
	switch (themePackage.format) {
		case ThemeEditorFormat.Intermediate:
			return universalThemeTag()
		case ThemeEditorFormat.Xcode:
			return xcodeThemeTag()
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
