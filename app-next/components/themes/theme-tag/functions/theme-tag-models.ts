import { ThemeAppearance } from "~/api/cockpit/records/themes/library/theme-appearance"
import { ThemeFormat, themeFormatNameForFormat, themeSymbolForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Props as ThemeTagProps } from "../components/theme-tag"

// Symbols

enum ThemeSymbols {
	LightMode = "#Light Mode Symbol",
	DarkMode = "#Dark Mode Symbol",
	Format = "#Format Symbol"
}

// Formats

export function themeTagPropsForAnyFormats(numberOfFormats?: number): ThemeTagProps {
	const designation = numberOfFormats === 1 ? "Format" : "Formats"
	const description = numberOfFormats === undefined ? "All" : String(numberOfFormats)

	return {
		name: `${description} ${designation}`,
		symbol: ThemeSymbols.Format
	}
}

export function themeTagPropsForAppearance(appearance: ThemeAppearance): ThemeTagProps {
	switch (appearance) {
		case ThemeAppearance.Light:
			return { name: "Light", symbol: ThemeSymbols.LightMode }
		case ThemeAppearance.Dark:
			return { name: "Dark", symbol: ThemeSymbols.DarkMode }
	}
}

export function themeTagPropsForFormat(format: ThemeFormat): ThemeTagProps {
	return {
		name: themeFormatNameForFormat(format),
		symbol: themeSymbolForFormat(format)
	}
}
