import { WebApplication, WithContext } from "schema-dts"
import { thumbnailUrlFromComponent } from "~/api/records/asset/functions/asset-source-provider"
import { themeStudioCanonicalHref, themeStudioDescription } from "~/components/themes/thema-meta/theme-meta-data"
import { URL } from "~/utils/routing/library/url"

export interface Props {
	coverAsset?: URL
}

export function themeStudioSchema(props: Props): WithContext<WebApplication> {
	const coverImageUrl = thumbnailUrlFromComponent(props.coverAsset)

	return {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		applicationCategory: "Directory",
		applicationSubCategory: "Color Theme Directory",
		name: "Theme Studio",
		abstract: themeStudioDescription(),
		url: themeStudioCanonicalHref(),
		image: coverImageUrl,
		author: "August Saint Freytag",
		keywords: "color, themes, code, editors, preview, development"
	}
}
