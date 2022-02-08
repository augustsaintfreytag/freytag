import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum ThemeLightness {
	Light = "Light",
	Dark = "Dark"
}

export const allThemeLightness: ThemeLightness[] = [ThemeLightness.Light, ThemeLightness.Dark]

export function themeLightnessFromRawValue(value: string): ThemeLightness | undefined {
	return enumCaseFromRawValue(value, allThemeLightness)
}
