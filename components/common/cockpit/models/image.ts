import { Url } from "../../library/url"

export namespace Image {

	export interface ContentEntry {

		field: {type: string, label: string}
		value: {path: string}

	}

	export class Content {

		path: Url|undefined
		
		constructor(entry: ContentEntry) {
			this.path = entry.value.path || undefined
		}

	}

}