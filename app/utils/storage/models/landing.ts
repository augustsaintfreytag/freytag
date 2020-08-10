import { Image } from "./image"
import { Work } from "./work-item"

export namespace Landing {

	// Live Model

	export class Graphic {

		asset: Image.Content|undefined
		caption: string|undefined

		constructor(entry: GraphicEntry) {
			this.asset = new Image.Content(entry.asset)
			this.caption = entry.caption || undefined
		}

	}

	export class Works {

		items: Work.Item[]
		
		constructor(entry: WorksEntry) {
			this.items = entry.items.map(workEntry => {
				return new Work.Item(workEntry)
			})
		}

	}

	// Stored Model

	export interface GraphicEntry {

		asset: Image.ContentEntry
		caption: string|undefined

	}

	export interface WorksEntry {

		items: Work.ItemEntry[]

	}

}