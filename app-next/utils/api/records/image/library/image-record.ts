export type ImageRecord = {
	path: string
}

export function isImageRecord(record: any): record is ImageRecord {
	return typeof record === "object" && typeof record.path === "string"
}
