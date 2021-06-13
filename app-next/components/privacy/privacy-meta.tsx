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
	return pageTitle("Privacy")
}

function description(): string {
	return lines("Privacy policy and legal disclosure of the overall site.")
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: canonicalHref("/privacy"),
		title: title(),
		description: description(),
		coverAsset: props.previewAsset
	}
}

const PrivacyMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default PrivacyMeta
