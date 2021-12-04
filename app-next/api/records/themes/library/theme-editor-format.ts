import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum ThemeEditorFormat {
	Intermediate = "Intermediate",
	Xcode = "Xcode"
}

export const allThemeEditorFormats: ThemeEditorFormat[] = [ThemeEditorFormat.Intermediate, ThemeEditorFormat.Xcode]

export function themeEditorFormatFromRawValue(value: string): ThemeEditorFormat | undefined {
	return enumCaseFromRawValue(value, allThemeEditorFormats)
}
