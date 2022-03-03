import { ThemeFormat, themeFormatIdentifierForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { URL } from "~/utils/routing/library/url"
import {
	archivedThemeFormats,
	themesDefaultVersion,
	themesOutputPath,
	themesPublicContentPath,
	themesVendor
} from "~/utils/themes/functions/theme-configuration"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"
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

// Public Resources

export function publicThemeFilePathFromManifest(manifest: ThemeManifest, format: ThemeFormat): URL | undefined {
	const resourcePackage = manifest.packages[format]

	if (!resourcePackage) {
		return undefined
	}

	return `${themesPublicContentPath()}/themes/${manifest.id}/${resourcePackage.group}/${resourcePackage.resource}`
}
