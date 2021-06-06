import { CockpitEntry } from "cockpit-access"
import { AssetLink } from "~/api/records/asset/library/asset-link"
import { CollectionAssetLink } from "~/api/records/asset/library/collection-asset-link"
import { WorkContentImageAlignment } from "~/api/records/work-showcase/library/work-showcase-image-alignment"

// Library

export enum TextContentFormat {
	Text = "Text",
	Heading = "Heading",
	Quote = "Quote"
}

// Models

export interface WorkContentText extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	format: TextContentFormat
	textContent?: string
}

export interface WorkContentImages extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	imageContents: CollectionAssetLink[]
	imageAlignment: WorkContentImageAlignment
}

export interface WorkContentVideoEmbed extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	videoCode: string
	videoAspectValue?: string
}

export interface WorkContentTitleCase extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	headingContent: string
	subContent?: string
	imageContent?: AssetLink
}

export type AnyWorkContent = WorkContentText | WorkContentImages | WorkContentVideoEmbed | WorkContentTitleCase
