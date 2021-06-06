type CollectionAssetMetadata = {
	title?: string
}

export type CollectionAssetRecord = {
	path: string
	meta?: CollectionAssetMetadata
}

export function isCollectionAssetRecord(record: any): record is CollectionAssetRecord {
	return typeof record === "object" && typeof record.path === "string"
}
