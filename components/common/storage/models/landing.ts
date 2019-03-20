import { Image } from "./image"
import { Work } from "./work-item";

export namespace Landing {

	// Live Model

	export class Graphic {

		asset: Image.Content|undefined

		constructor(entry: GraphicEntry) {
			this.asset = new Image.Content(entry.asset)
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

	}

	export interface WorksEntry {

		items: Work.ItemEntry[]

	}

}