import { SpriteReference } from "~/components/sprites/sprite"
import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum ThemeFormat {
	Intermediate = "Intermediate",
	Xcode = "Xcode",
	TextMate = "TextMate",
	VisualStudioCode = "Visual Studio Code"
}

export const allThemeFormats: ThemeFormat[] = [ThemeFormat.Intermediate, ThemeFormat.Xcode, ThemeFormat.TextMate, ThemeFormat.VisualStudioCode]

export function themeFormatFromRawValue(value: string): ThemeFormat | undefined {
	return enumCaseFromRawValue(value, allThemeFormats)
}

// Format Data

export function themeFormatIdentifierForFormat(format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "intermediate"
		case ThemeFormat.Xcode:
			return "xcode"
		case ThemeFormat.TextMate:
			return "textmate"
		case ThemeFormat.VisualStudioCode:
			return "vscode"
	}
}

export function themeFormatNameForFormat(format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "Intermediate"
		case ThemeFormat.Xcode:
			return "Xcode"
		case ThemeFormat.TextMate:
			return "TextMate"
		case ThemeFormat.VisualStudioCode:
			return "Visual Studio Code"
		default:
			console.warn(`Missing theme format name for value '${format}'.`)
			return "Unknown"
	}
}

export function themeFormatPurposeDescriptionForFormat(format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "Editing"
		case ThemeFormat.Xcode:
			return "Xcode"
		case ThemeFormat.TextMate:
			return "TextMate"
		case ThemeFormat.VisualStudioCode:
			return "Visual Studio Code"
		default:
			console.warn(`Missing theme format purpose for value '${format}'.`)
			return "Unknown"
	}
}

export function themeFileDescriptionForFormat(format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "intertheme (Intermediate theme file)"
		case ThemeFormat.Xcode:
			return "xccolortheme (Xcode theme file)"
		case ThemeFormat.TextMate:
			return "tmtheme (TextMate theme file)"
		case ThemeFormat.VisualStudioCode:
			return "bundle (Visual Studio Code extension)"
		default:
			return "Other"
	}
}

export function themeSymbolForFormat(format: ThemeFormat): SpriteReference {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "#Intermediate Format"
		case ThemeFormat.Xcode:
			return "#Xcode Format"
		case ThemeFormat.VisualStudioCode:
			return "#VS Code Format"
		default:
			return "#Format Symbol"
	}
}
