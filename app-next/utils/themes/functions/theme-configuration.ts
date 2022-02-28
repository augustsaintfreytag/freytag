import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { xccColorThemeOutputPath, xccColorThemeUtilityHost } from "~/utils/app/app"
import { AppConfigurationError } from "~/utils/app/app-configuration-error"

export const themesVendor = () => "color-theme-utility"
export const themesDefaultVersion = () => "1.0.0"

export const themesHost = () => {
	const host = xccColorThemeUtilityHost()
	if (!host) {
		throw new AppConfigurationError(`Missing configuration value for color theme utility host name for cross-container communication.`)
	}

	return host
}

export const themesOutputPath = () => {
	const outputPath = xccColorThemeOutputPath()
	if (!outputPath) {
		throw new AppConfigurationError(`Missing configuration value for color theme output path in container.`)
	}

	return outputPath
}

export const generatedThemeFormats: ThemeFormat[] = [ThemeFormat.Intermediate, ThemeFormat.Xcode, ThemeFormat.VisualStudioCode]
export const archivedThemeFormats: ThemeFormat[] = [ThemeFormat.VisualStudioCode]
