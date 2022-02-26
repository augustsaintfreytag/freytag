import { CockpitRecord } from "cockpit-access"
import { AssetLink } from "~/api/cockpit/records/asset/library/asset-link"
import { ImageLink } from "~/api/cockpit/records/asset/library/image-link"
import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { ThemeAppearance } from "./theme-appearance"

export interface Theme extends CockpitRecord {
	display: boolean
	name: string
	slug?: string
	description: string
	cover?: ImageLink
	colors: string
	appearance: ThemeAppearance
	packages?: ThemePackageRecord[]
}

export interface ThemePackage {
	format: ThemeFormat
	file: AssetLink
}

export interface ThemePackageRecord {
	value: ThemePackage
}
