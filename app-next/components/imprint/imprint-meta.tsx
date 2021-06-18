import { FunctionComponent } from "react"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta, { Props as MetaTagsProps } from "~/components/meta/meta-tags"
import { lines } from "~/utils/description/functions/lines"
import { URL } from "~/utils/routing/library/url"

interface Props {
	previewAsset?: URL
}

function title(): string {
	return pageTitle("Imprint")
}

function description(): string {
	return lines(
		"Legal disclosure and required public information of the Folio.",
		"Includes responsible parties, content and general accountability disclaimer."
	)
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
