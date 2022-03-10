import { ThemeFormat, themeFormatIdentifierForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { URL } from "~/utils/routing/library/url"
import {
	archivedThemeFormats,
	themeNameSanitizationExpression,
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
			return `${sanitizedThemeName(name)}.intertheme`
		case ThemeFormat.Xcode:
			return `${sanitizedThemeName(name)}.xccolortheme`
		case ThemeFormat.TextMate:
			return `${sanitizedThemeName(name)}.tmtheme`
		case ThemeFormat.VisualStudioCode:
			return `${themesVendor()}.${normalizedThemeName(name)}-${themesDefaultVersion()}`
	}
}

export function sanitizedThemeName(name: string): string {
	return name.replaceAll(themeNameSanitizationExpression, "").replaceAll(/\s+/g, " ").trim()
}

export function normalizedThemeName(name: string): string {
	return name.toLowerCase().replaceAll(/\s+/g, "-")
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

	const group = resourcePackage.group
	const resource = encodeURIComponent(resourcePackage.resource)

	return `${themesPublicContentPath()}/themes/${manifest.id}/${group}/${resource}`
}
