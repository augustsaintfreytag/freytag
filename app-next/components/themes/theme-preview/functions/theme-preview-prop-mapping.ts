import { Theme, ThemePackage } from "~/api/records/themes/library/theme"
import { allThemeEditorFormats, ThemeEditorFormat } from "~/api/records/themes/library/theme-editor-format"
import { ThemeLightness } from "~/api/records/themes/library/theme-lightness"
import { Props as ThemePreviewProps } from "~/components/themes/theme-preview/components/theme-preview"
import { Props as ThemeTagProps } from "~/components/themes/theme-tag/components/theme-tag"
import * as Tags from "~/components/themes/theme-tag/functions/theme-tag-models"
import { colorsFromEncodedData } from "~/utils/colors/functions/color-conversion"
import { Color } from "~/utils/colors/models/color"

// Preview Props

export function themePreviewPropsFromTheme(theme: Theme): ThemePreviewProps {
	return {
		name: theme.name,
		description: theme.description,
		colors: colorCollectionFromTheme(theme) ?? [],
		tags: themeTagPropsFromTheme(theme, false, false),
		link: {
			id: theme._id,
			slug: theme.slug
		}
	}
}

// Tag Props

export function themeTagPropsFromTheme(theme: Theme, summarizeFormats: boolean = false, includeDefaults: boolean = true): ThemeTagProps[] {
	const props: ThemeTagProps[] = []

	props.push(themeTagPropsForLightness(theme.lightness))

	const themePackages = theme.packages?.map(block => block.value) ?? []
	const themeFormats = themeFormatSet(themePackages)

	if (!includeDefaults) {
		themeFormats.delete(ThemeEditorFormat.Intermediate)
	}

	if (!summarizeFormats) {
		for (const themeFormat of themeFormats) {
			const packageProps = themeTagPropsForIndividualPackage(themeFormat)
			props.push(packageProps)
		}
	} else {
		const summarizedPackageProps = themeTagPropsForSummarizedPackages(themeFormats)
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

function themeTagPropsForIndividualPackage(themeFormat: ThemeEditorFormat): ThemeTagProps {
	switch (themeFormat) {
		case ThemeEditorFormat.Intermediate:
			return Tags.intermediateThemeTag()
		case ThemeEditorFormat.Xcode:
			return Tags.xcodeThemeTag()
	}
}

function themeTagPropsForSummarizedPackages(themeFormats: Set<ThemeEditorFormat>): ThemeTagProps | undefined {
	if (themeFormats.size === 0) {
		return undefined
	}

	if (themeFormats.size > 1 && themeFormats.size === allThemeEditorFormats.length) {
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

function colorCollectionFromTheme(theme: Theme): Color[] | undefined {
	return colorsFromEncodedData(theme.colors)
}
