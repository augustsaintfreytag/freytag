import { CockpitRecord } from "cockpit-access"
import { AssetLink } from "~/api/cockpit/records/asset/library/asset-link"
import { ImageLink } from "~/api/cockpit/records/asset/library/image-link"
import { ThemeEditorFormat } from "./theme-editor-format"
import { ThemeLightness } from "./theme-lightness"

export interface Theme extends CockpitRecord {
	display: boolean
	name: string
	slug?: string
	description: string
	cover?: ImageLink
	colors: string
	lightness: ThemeLightness
	packages?: ThemePackageRecord[]
}

export interface ThemePackage {
	format: ThemeEditorFormat
	file: AssetLink
}

export interface ThemePackageRecord {
	value: ThemePackage
}
