import { thumbnailUrlFromComponent } from "~/api/records/asset/functions/image-record-data-access"
import { indexBrandTitle } from "~/components/meta/components/brand-text"
import { Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"

interface Props {
	coverAsset?: string
}

function description(): string {
	return "Folio of August Saint Freytag, experience and concept designer, video and story artist. Discover and explore work showcases and stories, view past life events."
}

export function indexPageMetaProps(props: Props): MetaTagsProps {
	const cover = thumbnailUrlFromComponent(props.coverAsset)

	return {
		title: indexBrandTitle(),
		href: canonicalHref(),
		description: description(),
		coverImage: cover
	}
}
