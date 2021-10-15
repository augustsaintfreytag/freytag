import { CockpitEntry } from "cockpit-access"
import { ColorValue } from "~/api/common/library/color-value"
import { ImageLink } from "~/api/records/asset/library/image-link"
import { LifeEvent } from "~/api/records/life-event/library/life-event"
import { AnyWorkShowcaseContent } from "~/api/records/work-showcase/library/work-showcase-content"

// Showcase

export interface WorkShowcase extends CockpitEntry {
	display: boolean
	name: string
	slug: string
	description: string
	aside?: string
	event?: LifeEvent
	reducedEventAppearance?: boolean
	titleImage?: ImageLink
	teaserImageTrailing?: ImageLink
	teaserImageCentered?: ImageLink
	accentColor?: ColorValue
	blocks: ResolvedCollectionLink<AnyWorkShowcaseContent>[]
}

// Showcase Block Contents (Collection)

export interface CollectionLinkOptions {
	link: string
	display: string
	multiple: boolean
	limit: boolean
}

export interface ResolvedCollectionLink<ValueObject> {
	field: {
		type: string
		name?: string
		label?: string
		options?: CollectionLinkOptions
	}
	value: ValueObject
}
