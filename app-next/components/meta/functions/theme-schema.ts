import { CreativeWork, WithContext } from "schema-dts"
import { UUID } from "~/api/common/library/uuid"
import { thumbnailUrlFromComponent } from "~/api/records/asset/functions/asset-source-provider"
import { canonicalHref } from "~/components/meta/functions/canonical-href"

export interface Props {
	id: UUID
	nameShort: string
	nameFull: string
	author?: string
	dateCreated?: Date
	dateModified?: Date
	coverAsset?: string
	description?: string
}

export function themeSchema(props: Props): WithContext<CreativeWork> {
	const coverImageUrl = thumbnailUrlFromComponent(props.coverAsset)

	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		identifier: props.id,
		name: props.nameFull,
		url: canonicalHref(`/themes/${props.id}`),
		dateCreated: props.dateCreated?.toISOString(),
		dateModified: props.dateModified?.toISOString(),
		alternateName: props.nameShort,
		image: coverImageUrl,
		abstract: props.description,
		author: props.author,
		editor: "August Saint Freytag",
		keywords: "color, themes, code, syntax highlighting, editors"
	}
}
