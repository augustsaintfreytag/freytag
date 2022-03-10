import { CockpitRecord } from "cockpit-access"
import { AssetLink } from "~/api/cockpit/records/asset/library/asset-link"
import { ImageLink } from "~/api/cockpit/records/asset/library/image-link"
import { WorkContentImageAlignment } from "~/api/cockpit/records/work-showcase/library/work-showcase-image-alignment"
import { WorkShowcaseTextContentFormat } from "~/api/cockpit/records/work-showcase/library/work-showcase-text-content-format"
import { URL } from "~/utils/routing/library/url"

// Models

export interface WorkShowcaseContentText extends CockpitRecord {
	identifierItem: string
	identifierParent: string
	format: WorkShowcaseTextContentFormat
	textContent?: string
}

export interface WorkShowcaseContentImages extends CockpitRecord {
	identifierItem: string
	identifierParent: string
	imageContents: ImageLink[]
	imageAlignment: WorkContentImageAlignment
	decorative?: boolean
}

export interface WorkShowcaseContentVideoEmbed extends CockpitRecord {
	identifierItem: string
	identifierParent: string
	videoCode: string
	videoAspectValue?: string
}

export interface WorkShowcaseContentTitleCase extends CockpitRecord {
	identifierItem: string
	identifierParent: string
	headingContent: string
	subContent?: string
	imageContent?: ImageLink
	linkAsset?: AssetLink
	linkTarget?: URL
	linkLabel?: string
}

export type AnyWorkShowcaseContent =
	| WorkShowcaseContentText
	| WorkShowcaseContentImages
	| WorkShowcaseContentVideoEmbed
	| WorkShowcaseContentTitleCase
