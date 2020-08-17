import { ContentBlock, ContentBlockEntry, HeadingContentBlock, ImageColumnsContentBlock, TextColumnContentBlock, TextQuoteContentBlock, VideoVimeoContentBlock } from "@/utils/storage/models/content-block"
import { ContentBlockKind } from "@/utils/storage/models/content-block-kind"
import { ImageContent, ImageContentEntry } from "@/utils/storage/models/image-content"
import { LifeEvent, LifeEventEntry } from "@/utils/storage/models/life-event"
import { CockpitEntry, CockpitMetaData } from "cockpit-access"
import { SortableModel } from "../library/any-sortable-model"

// Live Model

export class WorkItem implements SortableModel<any> {

	display: boolean
	name: string
	slug: string|undefined
	description: string|undefined
	titleImage: ImageContent|undefined
	event: LifeEvent|undefined
	blocks: ContentBlock[]
	numberOfSamples: number
	meta: CockpitMetaData

	constructor(entry: WorkItemEntry) {
		this.display = entry.display
		this.name = entry.name
		this.slug = entry.slug || undefined
		this.description = entry.description || undefined
		
		if (entry.titleImage) {
			this.titleImage = new ImageContent(entry.titleImage)
		}

		if (entry.event) {
			this.event = new LifeEvent(entry.event)
		}
		
		this.blocks = (entry.blocks || []).map(contentBlockEntry => {
			switch (contentBlockEntry.form) {
				case ContentBlockKind.Heading:
					return new HeadingContentBlock(contentBlockEntry)
				case ContentBlockKind.TextQuote:
					return new TextQuoteContentBlock(contentBlockEntry)
				case ContentBlockKind.TextColumn:
					return new TextColumnContentBlock(contentBlockEntry)
				case ContentBlockKind.ImageColumns:
					return new ImageColumnsContentBlock(contentBlockEntry)
				case ContentBlockKind.VideoVimeo:
					return new VideoVimeoContentBlock(contentBlockEntry)
				default:
					return undefined
			}
		}).filter(model => { return model !== undefined }) as ContentBlock[]
		
		this.numberOfSamples = this.blocks.reduce((count: number, block: ContentBlock) => {
			if (block instanceof ImageColumnsContentBlock) {
				count += block.imageContents.length
			} else if (block instanceof VideoVimeoContentBlock) {
				count += 1
			}

			return count
		}, 0)

		this.meta = new CockpitMetaData(entry)
	}

}

// Stored Model

export interface WorkItemEntry extends CockpitEntry {

	display: boolean
	name: string
	slug: string|undefined
	description: string|undefined
	titleImage: ImageContentEntry|undefined
	event: LifeEventEntry|undefined
	blocks: ContentBlockEntry[]|undefined

}