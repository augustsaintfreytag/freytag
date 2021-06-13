import { FunctionComponent } from "react"
import { indexBrandTitle } from "~/components/meta/components/brand-text"
import Meta, { Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"

interface Props {
	previewAsset?: string
}

function title(): string {
	return indexBrandTitle()
}

function description(): string {
	return "Folio of August Saint Freytag, experience and concept designer, video and story artist. Discover and explore work showcases and stories, view past life events."
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: canonicalHref(),
		title: title(),
		description: description(),
		coverAsset: props.previewAsset
	}
}

const IndexMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default IndexMeta
