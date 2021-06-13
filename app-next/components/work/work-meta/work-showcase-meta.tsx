import { FunctionComponent } from "react"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import Meta, { MetaResourceKind, Props as MetaTagsProps } from "~/components/meta/components/meta-tags"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import { mappedWorkShowcaseListItemProps } from "~/components/work/work-content/functions/work-showcase-prop-mapping"

interface Props {
	showcase?: WorkShowcase
}

function title(heading: string): string {
	return pageTitle(heading)
}

function description(preview: string): string {
	const previewLines = preview.split("\n")
	return previewLines[0] ?? preview
}

function metaProps(props: Props): MetaTagsProps {
	const showcase = props.showcase

	if (!showcase) {
		return {
			href: canonicalHref("/work"),
			title: pageTitle("No Work")
		}
	}

	const { href, headingText, previewText } = mappedWorkShowcaseListItemProps(showcase)

	return {
		href: canonicalHref(href),
		kind: MetaResourceKind.Article,
		title: title(headingText),
		description: description(previewText),
		coverAsset: showcase.teaserImageCentered?.path
	}
}

const WorkShowcaseMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default WorkShowcaseMeta
