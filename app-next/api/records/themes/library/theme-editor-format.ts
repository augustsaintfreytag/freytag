import { SpriteReference } from "~/components/sprites/sprite"
import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum ThemeEditorFormat {
	Intermediate = "Intermediate",
	Xcode = "Xcode"
}

export const allThemeEditorFormats: ThemeEditorFormat[] = [ThemeEditorFormat.Intermediate, ThemeEditorFormat.Xcode]

export function themeEditorFormatFromRawValue(value: string): ThemeEditorFormat | undefined {
	return enumCaseFromRawValue(value, allThemeEditorFormats)
}

// Format Data

export function themeFormatPurposeDescriptionForEditorFormat(format: ThemeEditorFormat): string {
	switch (format) {
		case ThemeEditorFormat.Intermediate:
			return "Editing"
		case ThemeEditorFormat.Xcode:
			return "Xcode"
	}
}

export function themeFileDescriptionForEditorFormat(format: ThemeEditorFormat): string {
	switch (format) {
		case ThemeEditorFormat.Intermediate:
			return "intertheme (Intermediate Format)"
		case ThemeEditorFormat.Xcode:
			return "xccolorscheme (Xcode Theme)"
	}
}

export function themeSymbolForEditorFormat(format: ThemeEditorFormat): SpriteReference {
	switch (format) {
		case ThemeEditorFormat.Intermediate:
			return "#Intermediate Format"
		case ThemeEditorFormat.Xcode:
			return "#Xcode Format"
	}
}
