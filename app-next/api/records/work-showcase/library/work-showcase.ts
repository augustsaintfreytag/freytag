import { CockpitEntry } from "cockpit-access"
import { AssetRecord } from "~/api/records/asset/library/asset-record"
import { ImageRecord } from "~/api/records/image/library/image-record"
import { LifeEvent } from "~/api/records/life-event/library/life-event"

// Showcase

export type WorkShowcase = CockpitEntry & {
	display: boolean
	name: string
	slug?: string
	description?: string
	titleImage?: ImageRecord
	teaserImageTrailing?: ImageRecord
	teaserImageCentered?: ImageRecord
	event?: LifeEvent
	blocks?: WorkShowcaseBlock[]
}

// Showcase Block

export type WorkShowcaseBlock = CockpitEntry & {
	form: string
	identifierItem: string
	identifierGroup: string
	textContent?: string
	subTextContent?: string
	imageContents?: WorkShowcaseMediaComponent[]
	imageAlignment?: string
	videoCode?: string
	videoAspectValue?: string
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

export type WorkShowcaseMediaComponent =
	| WorkShowcaseBlockContent<ImageRecord>
	| WorkShowcaseBlockContent<AssetRecord>
	| WorkShowcaseBlockContent<string>
