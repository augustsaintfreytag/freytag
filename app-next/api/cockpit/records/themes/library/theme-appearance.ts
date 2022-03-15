import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum ThemeAppearance {
	Light = "Light",
	Dark = "Dark"
}

export const allThemeAppearance: ThemeAppearance[] = [ThemeAppearance.Light, ThemeAppearance.Dark]

export function themeAppearanceFromRawValue(value: string): ThemeAppearance | undefined {
	return enumCaseFromRawValue(value, allThemeAppearance)
}
