import { FunctionComponent } from "react"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta, { Props as MetaTagsProps } from "~/components/meta/meta-tags"
import { lines } from "~/utils/description/functions/lines"
import { URL } from "~/utils/routing/library/url"

interface Props {
	previewImage?: URL
}

function title(): string {
	return pageTitle("Life")
}

function description(): string {
	return lines(
		"Interactive vita offering an aerial perspective on personal life milestones and projects.",
		"Records of personal life, work in film and video, photographic series, creations in artwork and graphics,",
		"development work (applications and web projects), and commissions."
	)
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: canonicalHref("/life"),
		title: title(),
		description: description(),
		coverAsset: props.previewImage
	}
}

const LifeMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default LifeMeta
