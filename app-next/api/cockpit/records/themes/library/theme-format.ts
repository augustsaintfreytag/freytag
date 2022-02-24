import { SpriteReference } from "~/components/sprites/sprite"
import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum ThemeFormat {
	Intermediate = "intermediate",
	Xcode = "xcode",
	TextMate = "textmate",
	VisualStudioCode = "vscode"
}

export const allThemeFormats: ThemeFormat[] = [ThemeFormat.Intermediate, ThemeFormat.Xcode, ThemeFormat.TextMate, ThemeFormat.VisualStudioCode]

export function themeFormatFromRawValue(value: string): ThemeFormat | undefined {
	return enumCaseFromRawValue(value, allThemeFormats)
}

// Format Data

export function themeFormatPurposeDescriptionForEditorFormat(format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "Editing"
		case ThemeFormat.Xcode:
			return "Xcode"
		default:
			return "Other"
	}
}

export function themeFileDescriptionForFormat(format: ThemeFormat): string {
	switch (format) {
		case ThemeFormat.Intermediate:
			return "intertheme (Intermediate Format)"
		case ThemeFormat.Xcode:
			return "xccolorscheme (Xcode Theme)"
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
		default:
			return "#Format Symbol"
	}
}
