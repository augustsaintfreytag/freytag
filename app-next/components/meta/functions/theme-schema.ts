import { CreativeWork, WithContext } from "schema-dts"
import { thumbnailUrlFromComponent } from "~/api/cockpit/records/asset/functions/asset-source-provider"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { UUID } from "~/utils/uuid/uuid"

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
