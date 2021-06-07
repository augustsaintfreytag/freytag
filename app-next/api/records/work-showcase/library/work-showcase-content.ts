import { CockpitEntry } from "cockpit-access"
import { AssetLink } from "~/api/records/asset/library/asset-link"
import { ImageLink } from "~/api/records/asset/library/image-link"
import { WorkContentImageAlignment } from "~/api/records/work-showcase/library/work-showcase-image-alignment"
import { WorkShowcaseTextContentFormat } from "~/api/records/work-showcase/library/work-showcase-text-content-format"

// Models

export interface WorkShowcaseContentText extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	format: WorkShowcaseTextContentFormat
	textContent?: string
}

export interface WorkShowcaseContentImages extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	imageContents: ImageLink[]
	imageAlignment: WorkContentImageAlignment
}

export interface WorkShowcaseContentVideoEmbed extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	videoCode: string
	videoAspectValue?: string
}

export interface WorkShowcaseContentTitleCase extends CockpitEntry {
	identifierItem: string
	identifierParent: string
	headingContent: string
	subContent?: string
	imageContent?: AssetLink
}

export type AnyWorkShowcaseContent =
	| WorkShowcaseContentText
	| WorkShowcaseContentImages
	| WorkShowcaseContentVideoEmbed
	| WorkShowcaseContentTitleCase
