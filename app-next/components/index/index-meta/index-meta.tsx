import { FunctionComponent } from "react"
import { indexBrandTitle } from "~/components/meta/components/brand-text"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import Meta, { Props as MetaTagsProps } from "~/components/meta/meta-tags"
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
		"Public folio, permanent exhibition and project retrospective.",
		"Discover work showcases, behind the scenes, and life events from then to now."
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
