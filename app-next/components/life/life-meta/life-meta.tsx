import { FunctionComponent } from "react"
import Meta, { Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"

interface Props {
	coverAsset?: string
}

function title(): string {
	return pageTitle("Life")
}

function description(): string {
	return [
		"Interactive vita offering an aerial perspective on personal life milestones and projects of August Saint Freytag.",
		"Records of personal life, work in film and video, photographic series, creations in artwork and graphics, development work (applications and web projects), and commissions."
	].join(" ")
}

function metaProps(props: Props): MetaTagsProps {
	return {
		href: canonicalHref("/life"),
		title: title(),
		description: description(),
		coverAsset: props.coverAsset
	}
}

const LifeMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default LifeMeta
