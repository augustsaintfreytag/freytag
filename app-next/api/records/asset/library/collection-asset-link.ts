interface CollectionAssetMetadata {
	title?: string
}

export interface CollectionAssetLink {
	path: string
	meta?: CollectionAssetMetadata
}

export function isCollectionAssetLink(object: any): object is CollectionAssetLink {
	return typeof object === "object" && typeof object.path === "string"
}
