import { Url } from "../../library/url"

export namespace Image {

	// Live Model

	export class Content {

		path: Url|undefined
		
		constructor(entry: ContentEntry) {
			this.path = entry.path || undefined
		}

	}

	// Stored Model

	export interface ContentEntry {

		path: string

	}

}