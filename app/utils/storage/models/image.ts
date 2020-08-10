import { URL } from "@/utils/common/library/url"

export namespace Image {

	// Live Model

	export class Content {

		path: URL|undefined
		caption: string|undefined
		
		constructor(entry: ContentEntry, labelEntry?: string|undefined) {
			this.path = entry.path || undefined
			
			if (labelEntry) {
				this.caption = labelEntry
			}
		}

	}

	// Stored Model

	export interface ContentEntry {

		path: string

	}

}