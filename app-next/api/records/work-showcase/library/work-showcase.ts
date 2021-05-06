import { CockpitEntry } from "cockpit-access"
import { ImageRecord } from "~/api/records/image/library/image-record"
import { LifeEvent } from "~/api/records/life-event/library/life-event"

// Showcase

export type WorkShowcase = CockpitEntry & {
	display: boolean
	name: string
	slug?: string
	description?: string
	titleImage?: ImageRecord
	teaserImage?: ImageRecord
	event?: LifeEvent
	blocks?: WorkShowcaseBlock[]
}

// Showcase Block

export type WorkShowcaseBlock = CockpitEntry & {
	form: string
	identifierItem: string
	identifierGroup: string
	textContent: string
	imageContents?: WorkShowcaseImageComponent[]
	videoCode: string
	videoAspectValue: string
}

// Showcase Block Contents (Collection)

export type WorkShowcaseBlockContent<ValueObject> = {
	field: {
		type: string
		name?: string
		label?: string
	}
	value: ValueObject
}

export type AnyWorkShowcaseBlockContent = WorkShowcaseBlockContent<any>
export type WorkShowcaseImageComponent = WorkShowcaseBlockContent<ImageRecord> | WorkShowcaseBlockContent<string>
