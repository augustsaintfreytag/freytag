import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { themesDefaultVersion, themesVendor } from "~/utils/themes/functions/theme-configuration"

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
