import { Image } from "@/modules/storage/models/image"
import { CockpitEntry, CockpitMetaData } from "cockpit-access"
import { SortableModel } from "../library/any-sortable-model"
import { Content } from "./content-block"
import { Vita } from "./vita-event"

export namespace Work {

	// Live Model

	export class Item implements SortableModel<any> {

		display: boolean
		name: string
		slug: string|undefined
		description: string|undefined
		titleImage: Image.Content|undefined
		event: Vita.Event|undefined
		blocks: Content.Block[]
		numberOfSamples: number
		meta: CockpitMetaData

		constructor(entry: ItemEntry) {
			this.display = entry.display
			this.name = entry.name
			this.slug = entry.slug || undefined
			this.description = entry.description || undefined
			
			if (entry.titleImage) {
				this.titleImage = new Image.Content(entry.titleImage)
			}

			if (entry.event) {
				this.event = new Vita.Event(entry.event)
			}
			
			this.blocks = (entry.blocks || []).map(contentBlockEntry => {
				switch (contentBlockEntry.form) {
					case Content.Form.Heading:
						return new Content.HeadingBlock(contentBlockEntry)
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
			
			this.numberOfSamples = this.blocks.reduce((count: number, block: Content.Block) => {
				if (block instanceof Content.ImageColumnsBlock) {
					count += block.imageContents.length
				} else if (block instanceof Content.VideoVimeoBlock) {
					count += 1
				}

				return count
			}, 0)

			this.meta = new CockpitMetaData(entry)
		}

	}

	// Stored Model

	export interface ItemEntry extends CockpitEntry {

		display: boolean
		name: string
		slug: string|undefined
		description: string|undefined
		titleImage: Image.ContentEntry|undefined
		event: Vita.EventEntry|undefined
		blocks: Content.BlockEntry[]|undefined

	}

}