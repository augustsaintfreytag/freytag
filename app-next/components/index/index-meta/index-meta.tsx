import { FunctionComponent } from "react"
import { indexBrandTitle } from "~/components/meta/components/brand-text"
import Meta, { Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { lines } from "~/utils/description/functions/lines"
import { URL } from "~/utils/routing/library/url"

interface Props {
	previewAsset?: URL
}

function title(): string {
	return indexBrandTitle()
}

function description(): string {
	return lines(
		"Folio of August Saint Freytag, permanent exhibition and retrospective of past and current projects.",
		"Discover work showcases, stories, and past life events."
	)
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
