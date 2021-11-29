import { CockpitEntry } from "cockpit-access"

export interface Theme extends CockpitEntry {
	display: boolean
	name: string
	description: string
	colors: string
	lightness: ThemeLightness
	packages: ThemePackageBlock[]
}

export enum ThemeLightness {
	Light = "Light",
	Dark = "Dark"
}

export interface ThemePackage {
	format: ThemeEditorFormat
	file: string
}

export interface ThemePackageBlock {
	value: ThemePackage
}

export enum ThemeEditorFormat {
	Intermediate = "Intermediate",
	Xcode = "Xcode"
}
