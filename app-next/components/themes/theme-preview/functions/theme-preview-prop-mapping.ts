import { Theme, ThemePackage } from "~/api/records/themes/library/theme"
import { allThemeEditorFormats, ThemeEditorFormat } from "~/api/records/themes/library/theme-editor-format"
import { ThemeLightness } from "~/api/records/themes/library/theme-lightness"
import { Props as ThemePreviewProps } from "~/components/themes/theme-preview/components/theme-preview"
import { Props as ThemeTagProps } from "~/components/themes/theme-tag/components/theme-tag"
import * as Tags from "~/components/themes/theme-tag/functions/theme-tag-models"
import { colorFromHex } from "~/utils/colors/functions/color-conversion"
import { Color } from "~/utils/colors/models/color"

// Preview Props

export function themePreviewPropsFromTheme(theme: Theme): ThemePreviewProps {
	return {
		name: theme.name,
		description: theme.description,
		colors: colorCollectionFromTheme(theme),
		tags: themeTagPropsFromTheme(theme, true),
		link: {
			id: theme._id
		}
	}
}

// Tag Props

export function themeTagPropsFromTheme(theme: Theme, summarizeFormats: boolean = false): ThemeTagProps[] {
	const props: ThemeTagProps[] = []

	props.push(themeTagPropsForLightness(theme.lightness))

	const themePackages = theme.packages?.map(block => block.value) ?? []
	if (!summarizeFormats) {
		for (const themePackage of themePackages) {
			const packageProps = themeTagPropsForIndividualPackage(themePackage)
			props.push(packageProps)
		}
	} else {
		const summarizedPackageProps = themeTagPropsForSummarizedPackages(themePackages)
		if (summarizedPackageProps) {
			props.push(summarizedPackageProps)
		}
	}

	return props
}

function themeTagPropsForLightness(lightness: ThemeLightness): ThemeTagProps {
	switch (lightness) {
		case ThemeLightness.Light:
			return Tags.lightThemeTag()
		case ThemeLightness.Dark:
			return Tags.darkThemeTag()
	}
}

function themeTagPropsForIndividualPackage(themePackage: ThemePackage): ThemeTagProps {
	switch (themePackage.format) {
		case ThemeEditorFormat.Intermediate:
			return Tags.intermediateThemeTag()
		case ThemeEditorFormat.Xcode:
			return Tags.xcodeThemeTag()
	}
}

function themeTagPropsForSummarizedPackages(themePackages: ThemePackage[]): ThemeTagProps | undefined {
	const themeFormats = themeFormatSet(themePackages)

	if (themeFormats.size === 0) {
		return undefined
	}

	if (allThemeEditorFormats.length === themeFormats.size) {
		return Tags.formatThemeTag(Tags.allFormats)
	}

	return Tags.formatThemeTag(themeFormats.size)
}

function themeFormatSet(themePackages: ThemePackage[]): Set<ThemeEditorFormat> {
	const themeFormats = new Set<ThemeEditorFormat>()

	themePackages.forEach(themePackage => {
		themeFormats.add(themePackage.format)
	})

	return themeFormats
}

// Color Props

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
