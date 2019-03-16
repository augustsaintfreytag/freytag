import { Vita } from "./vita-event"
import { Image } from "./image"
import { Content } from "./content-block";
import { CockpitEntry } from "./cockpit-entry"
import MetaData from "./meta-data"

export namespace Work {

	// Live Model

	export class Item {

		display: boolean
		name: string
		description: string|undefined
		titleImage: Image.Content|undefined
		event: Vita.Event|undefined
		blocks?: Content.Block[]
		meta: MetaData

		constructor(entry: ItemEntry) {
			this.display = entry.display
			this.name = entry.name
			this.description = entry.description || undefined
			
			if (entry.titleImage) {
				this.titleImage = new Image.Content(entry.titleImage)
			}

			if (entry.event) {
				this.event = new Vita.Event(entry.event)
			}
			
			this.blocks = (entry.blocks || []).map(contentBlockEntry => {
				switch (contentBlockEntry.form) {
					case Content.Form.TextQuote:
						return new Content.TextQuoteBlock(contentBlockEntry)
					case Content.Form.TextColumn:
						return new Content.TextColumnBlock(contentBlockEntry)
					case Content.Form.ImageColumns:
						return new Content.ImageColumnsBlock(contentBlockEntry)
					case Content.Form.VideoVimeo:
						return new Content.VideoVimeoBlock(contentBlockEntry)
					default:
						return undefined
				}
			}).filter(model => { return model !== undefined }) as Content.Block[]

			this.meta = new MetaData(entry)
		}

	}

	// Stored Model

	export interface ItemEntry extends CockpitEntry {

		display: boolean
		name: string
		description: string|undefined
		titleImage: Image.ContentEntry|undefined
		event: Vita.EventEntry|undefined
		blocks: Content.BlockEntry[]|undefined

	}

}