import { ThemeFormat, themeFormatIdentifierForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { URL } from "~/utils/routing/library/url"
import { archivedThemeFormats, themesDefaultVersion, themesOutputPath, themesVendor } from "~/utils/themes/functions/theme-configuration"
import { UUID } from "~/utils/uuid/uuid"

// Unaffiliated Resources

export function themeFileName(name: string, format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return `${name}.intertheme`
		case ThemeFormat.Xcode:
			return `${name}.xccolortheme`
		case ThemeFormat.TextMate:
			return `${name}.tmtheme`
		case ThemeFormat.VisualStudioCode:
			return `${themesVendor()}.${normalizedThemeFileName(name)}-${themesDefaultVersion()}`
	}
}

function normalizedThemeFileName(name: string): string {
	return name.toLowerCase().replaceAll(" ", "-")
}

// Deposited Resources

export function depositedThemeFileName(name: string, format: ThemeFormat): string {
	const resourceName = themeFileName(name, format)

	if (!archivedThemeFormats.includes(format)) {
		return resourceName
	}

	return `${resourceName}.zip`
}

export function depositedThemeFilePath(id: UUID, name: string, format: ThemeFormat): URL {
	const formatIdentifier = themeFormatIdentifierForFormat(format)
	const fileName = depositedThemeFileName(name, format)

	return `${themesOutputPath()}/${id}/${formatIdentifier}/${fileName}`
}
