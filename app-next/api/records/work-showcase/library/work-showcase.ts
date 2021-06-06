import { CockpitEntry } from "cockpit-access"
import { AssetLink } from "~/api/records/asset/library/asset-link"
import { CollectionAssetLink } from "~/api/records/asset/library/collection-asset-link"
import { LifeEvent } from "~/api/records/life-event/library/life-event"

// Showcase

export interface WorkShowcase extends CockpitEntry {
	display: boolean
	name: string
	slug: string
	description: string
	event?: LifeEvent
	titleImage?: AssetLink
	teaserImage?: ImageLink
	teaserImageCentered?: ImageLink
	blocks: CollectionLink[]
}

// Showcase Block

export interface WorkShowcaseBlock extends CockpitEntry {
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

export interface WorkShowcaseBlockContent<ValueObject> {
	field: {
		type: string
		name?: string
		label?: string
	}
	value: ValueObject
}

export type AnyWorkShowcaseBlockContent = WorkShowcaseBlockContent<any>

export type WorkShowcaseMediaComponent =
	| WorkShowcaseBlockContent<CollectionAssetLink>
	| WorkShowcaseBlockContent<AssetLink>
	| WorkShowcaseBlockContent<string>
