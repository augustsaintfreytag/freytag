import { Article, WithContext } from "schema-dts"
import { thumbnailUrlFromComponent } from "~/api/cockpit/records/asset/functions/asset-source-provider"

export interface Props {
	dateCreated?: Date
	dateModified?: Date
	coverAsset?: string
	title?: string
}

export function articleSchema(props: Props): WithContext<Article> {
	const coverImageUrl = thumbnailUrlFromComponent(props.coverAsset)

	return {
		"@context": "https://schema.org",
		"@type": "Article",
		dateCreated: props.dateCreated?.toISOString(),
		dateModified: props.dateModified?.toISOString(),
		headline: props.title,
		image: coverImageUrl
	}
}
