import { FunctionComponent } from "react"
import Meta, { Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import { lines } from "~/utils/description/functions/lines"

interface Props {
	previewAsset?: string
}

function title(): string {
	return pageTitle("Work")
}

function description(): string {
	return lines(
		"Collection of work showcases, a personal view into past and current projects of August Saint Freytag.",
		"Showcases offer diverse insights and retrospectives to in-progress or completed ventures and projects, compiled and written by August Saint Freytag.",
		"The covered work includes photographic series, film, video, and music video productions, behind the scenes looks, conceptual designs,",
		"interactive experiences, apps, and other projects."
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

const WorkMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default WorkMeta
