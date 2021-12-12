import { CockpitRecord } from "cockpit-access"
import { ImageLink } from "~/api/records/asset/library/image-link"
import { ThemeEditorFormat } from "./theme-editor-format"
import { ThemeLightness } from "./theme-lightness"

export interface Theme extends CockpitRecord {
	display: boolean
	name: string
	description: string
	cover?: ImageLink
	colors: string
	lightness: ThemeLightness
	packages?: ThemePackageBlock[]
}

export interface ThemePackage {
	format: ThemeEditorFormat
	file: string
}

export interface ThemePackageBlock {
	value: ThemePackage
}
