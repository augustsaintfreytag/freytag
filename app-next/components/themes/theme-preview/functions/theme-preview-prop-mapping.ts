import { Theme, ThemePackage } from "~/api/cockpit/records/themes/library/theme"
import { allThemeFormats, ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Props as ThemePreviewProps } from "~/components/themes/theme-preview/components/theme-preview"
import { Props as ThemeTagProps } from "~/components/themes/theme-tag/components/theme-tag"
import {
	themeTagPropsForAnyFormats,
	themeTagPropsForAppearance,
	themeTagPropsForFormat
} from "~/components/themes/theme-tag/functions/theme-tag-models"
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

	props.push(themeTagPropsForAppearance(theme.appearance))

	const themePackages = themePackagesFromTheme(theme)
	const themeFormats = themeFormatSet(themePackages)

	if (!includeDefaults) {
		themeFormats.delete(ThemeFormat.Intermediate)
	}

	if (!summarizeFormats) {
		for (const themeFormat of themeFormats) {
			const packageProps = themeTagPropsForFormat(themeFormat)
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

function themeTagPropsForSummarizedPackages(themeFormats: Set<ThemeFormat>): ThemeTagProps | undefined {
	if (themeFormats.size === 0) {
		return undefined
	}

	if (themeFormats.size > 1 && themeFormats.size === allThemeFormats.length) {
		return themeTagPropsForAnyFormats()
	}

	return themeTagPropsForAnyFormats(themeFormats.size)
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
