export type AssetRecord = {
	path: string
	title: string
	description: string
	mime: string
	size: number
}

export function isAssetRecord(record: any): record is AssetRecord {
	return typeof record === "object" && typeof record.path === "string" && typeof record.mime === "string"
}
