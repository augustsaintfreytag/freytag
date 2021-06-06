type HexColorCode = string

export interface AssetLink {
	path: string
	title: string
	description: string
	tags: string[]
	mime: string
	size: number
	image: boolean
	video: boolean
	audio: boolean
	archive: boolean
	document: boolean
	code: boolean
	colors: HexColorCode[]
	width: number
	height: number
}

export function isAssetLink(object: any): object is AssetLink {
	return typeof object === "object" && typeof object.path === "string" && typeof object.mime === "string" && typeof object.size === "number"
}
