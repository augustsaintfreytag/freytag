import { CockpitEntry } from "cockpit-access"
import { ImageRecord } from "~/utils/api/records/image/library/image-record"
import { LifeEvent } from "~/utils/api/records/life-event/library/life-event"

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

export type WorkShowcaseBlock = CockpitEntry & {
	form: string
	identifierItem: string
	identifierGroup: string
	textContent: string
	imageContents?: AnyWorkShowcaseBlockContent[]
	videoCode: string
	videoAspectValue: string
}

export type AnyWorkShowcaseBlockContent = WorkShowcaseBlockContent<any>

export type WorkShowcaseBlockContent<ValueObject> = {
	field: {
		type: string
		name?: string
		label?: string
	}
	value: ValueObject
}
