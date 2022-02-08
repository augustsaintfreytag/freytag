import { CockpitRecord } from "cockpit-access"
import { ImageLink } from "~/api/cockpit/records/asset/library/image-link"
import { LifeEvent } from "~/api/cockpit/records/life-event/library/life-event"
import { AnyWorkShowcaseContent } from "~/api/cockpit/records/work-showcase/library/work-showcase-content"
import { ColorDescription } from "~/utils/colors/library/color-description"

// Showcase

export interface WorkShowcase extends CockpitRecord {
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
	accentColor?: ColorDescription
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
