interface ImageMetadata {
	title?: string
}

export interface ImageLink {
	path: string
	meta?: ImageMetadata
}

export function isImageLink(object: any): object is ImageLink {
	return typeof object === "object" && typeof object.path === "string"
}
