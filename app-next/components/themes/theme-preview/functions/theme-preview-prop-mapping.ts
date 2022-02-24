import { Theme, ThemePackage } from "~/api/cockpit/records/themes/library/theme"
import { allThemeFormats, ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { ThemeLightness } from "~/api/cockpit/records/themes/library/theme-lightness"
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

	const themePackages = themePackagesFromTheme(theme)
	const themeFormats = themeFormatSet(themePackages)

	if (!includeDefaults) {
		themeFormats.delete(ThemeFormat.Intermediate)
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

function themeTagPropsForIndividualPackage(themeFormat: ThemeFormat): ThemeTagProps {
	switch (themeFormat) {
		case ThemeFormat.Intermediate:
			return Tags.intermediateThemeTag()
		case ThemeFormat.Xcode:
			return Tags.xcodeThemeTag()
	}
}

function themeTagPropsForSummarizedPackages(themeFormats: Set<ThemeFormat>): ThemeTagProps | undefined {
	if (themeFormats.size === 0) {
		return undefined
	}

	if (themeFormats.size > 1 && themeFormats.size === allThemeFormats.length) {
		return Tags.formatThemeTag(Tags.allFormats)
	}

	return Tags.formatThemeTag(themeFormats.size)
}

export function themeFormatSet(themePackages: ThemePackage[]): Set<ThemeFormat> {
	const themeFormats = new Set<ThemeFormat>()

	themePackages.forEach(themePackage => {
		themeFormats.add(themePackage.format)
	})

	return themeFormats
}

export function themePackagesFromTheme(theme: Theme): ThemePackage[] {
	return theme.packages?.map(element => element.value) ?? []
}

// Color Props

function colorCollectionFromTheme(theme: Theme): Color[] | undefined {
	return colorsFromEncodedData(theme.colors)
}
