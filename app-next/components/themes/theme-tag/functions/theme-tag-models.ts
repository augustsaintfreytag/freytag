import { Props as ThemeTagProps } from "../components/theme-tag"

enum ThemeSymbols {
	LightMode = "#Light Mode Symbol",
	DarkMode = "#Dark Mode Symbol",
	Format = "#Format Symbol",
	UniversalFormat = "#Universal Format",
	XcodeFormat = "#Xcode Format",
	VSCodeFormat = "#VSCode Format",
	TerminalFormat = "#Terminal Format"
}

// Lightness

export function lightThemeTag(): ThemeTagProps {
	return { name: "light", symbol: ThemeSymbols.LightMode }
}

export function darkThemeTag(): ThemeTagProps {
	return { name: "Dark", symbol: ThemeSymbols.DarkMode }
}

// Formats

export function formatThemeTag(numberOfFormats: number): ThemeTagProps {
	const designation = numberOfFormats === 1 ? "Format" : "Formats"

	return {
		name: `${numberOfFormats} ${designation}`,
		symbol: ThemeSymbols.Format
	}
}

export function universalThemeTag(): ThemeTagProps {
	return { name: "Universal", symbol: ThemeSymbols.UniversalFormat }
}

export function xcodeThemeTag(): ThemeTagProps {
	return { name: "Xcode", symbol: ThemeSymbols.XcodeFormat }
}

export function vsCodeThemeTag(): ThemeTagProps {
	return { name: "Visual Studio Code", symbol: ThemeSymbols.VSCodeFormat }
}

export function terminalThemeTag(): ThemeTagProps {
	return { name: "Terminal", symbol: ThemeSymbols.TerminalFormat }
}
