import { ImageContent, ImageContentEntry } from "@/utils/storage/models/image-content"
import { WorkItem, WorkItemEntry } from "@/utils/storage/models/work-item"

// Live Model

export class LandingGraphic {

	asset: ImageContent|undefined
	caption: string|undefined

	constructor(entry: LandingGraphicEntry) {
		this.asset = new ImageContent(entry.asset)
		this.caption = entry.caption || undefined
	}

}

export class LandingWorks {

	items: WorkItem[]
	
	constructor(entry: LandingWorksEntry) {
		this.items = entry.items.map(workEntry => {
			return new WorkItem(workEntry)
		})
	}

}

// Stored Model

export interface LandingGraphicEntry {

	asset: ImageContentEntry
	caption: string|undefined

}

export interface LandingWorksEntry {

	items: WorkItemEntry[]

}