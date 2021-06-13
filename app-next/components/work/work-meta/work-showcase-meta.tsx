import { FunctionComponent } from "react"
import { dateFromTimestamp } from "~/api/common/functions/date-conversion"
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

function author(): string {
	return "August Saint Freytag"
}

function dates(showcase: WorkShowcase): { dateCreated?: Date; dateModified?: Date } {
	let dates: { dateCreated?: Date; dateModified?: Date } = {}

	if (showcase._created) {
		dates.dateCreated = dateFromTimestamp(showcase._created)
	}

	if (showcase._modified) {
		dates.dateModified = dateFromTimestamp(showcase._modified)
	}

	return dates
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
	const { dateCreated, dateModified } = dates(showcase)

	return {
		href: canonicalHref(href),
		kind: MetaResourceKind.Article,
		title: title(headingText),
		description: description(previewText),
		coverAsset: showcase.teaserImageCentered?.path,
		author: author(),
		section: showcase.event?.kind,
		dateCreated: dateCreated,
		dateModified: dateModified
	}
}

const WorkShowcaseMeta: FunctionComponent<Props> = props => <Meta {...metaProps(props)} />

export default WorkShowcaseMeta
