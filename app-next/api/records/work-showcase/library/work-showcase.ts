import { CockpitEntry } from "cockpit-access"
import { AssetLink } from "~/api/records/asset/library/asset-link"
import { LifeEvent } from "~/api/records/life-event/library/life-event"

// Showcase

export interface WorkShowcase extends CockpitEntry {
	display: boolean
	name: string
	slug: string
	description: string
	event?: LifeEvent
	titleImage?: AssetLink
	teaserImage?: AssetLink
	teaserImageCentered?: AssetLink
	blocks: AnyWorkShowcaseBlockContent[]
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

export type AnyWorkShowcaseBlockContent = ResolvedCollectionLink<AnyWorkShowcaseBlockContent>
