import { Theme, ThemePackage } from "~/api/cockpit/records/themes/library/theme"
import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

export function themePackageFromTheme(theme: Theme, format: ThemeFormat): ThemePackage | undefined {
	return theme.packages?.filter(themePackage => {
		return themePackage.value.format === format
	})[0]?.value
}

export function decodedIntermediateThemeFromData(encodedTheme: string): IntermediateTheme | undefined {
	if (!encodedTheme) {
		return undefined
	}

	try {
		const decodedTheme = JSON.parse(encodedTheme)

		if (typeof decodedTheme !== "object" || !decodedTheme["format"] || !decodedTheme["version"]) {
			throw new TypeError(`Decoded package lacks intermediate theme headers.`)
		}

		return decodedTheme as IntermediateTheme
	} catch (error) {
		console.error(`Could not decode intermediate theme package. ${error}`)
		return undefined
	}
}
