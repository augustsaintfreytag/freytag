import { FunctionComponent } from "react"
import Meta, { Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import { lines } from "~/utils/description/functions/lines"
import { URL } from "~/utils/routing/library/url"

interface Props {
	previewAsset?: URL
}

function title(): string {
	return pageTitle("Imprint")
}

function description(): string {
	return lines("Legal disclosure and public required information of the overall site.")
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: canonicalHref("/imprint"),
		title: title(),
		description: description(),
		coverAsset: props.previewAsset
	}
}

const ImprintMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default ImprintMeta
