import { URL } from "@/utils/common/library/url"

// Live Model

export class ImageContent {

	path: URL|undefined
	caption: string|undefined
	
	constructor(entry: ImageContentEntry, labelEntry?: string|undefined) {
		this.path = entry.path || undefined
		
		if (labelEntry) {
			this.caption = labelEntry
		}
	}

}

// Stored Model

export interface ImageContentEntry {

	path: string

}