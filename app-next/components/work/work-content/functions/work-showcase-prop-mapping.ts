import { UUID } from "~/api/common/library/uuid"
import { LifeEventKind, lifeEventKindFromRawValue } from "~/api/records/life-event/library/life-event-kind"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { URL } from "~/utils/routing/library/url"

interface ImageProps {
	trailing: URL
	centered: URL
}

interface Link {
	kind: LifeEventKind
}

interface Props {
	id: UUID
	slug?: string
	headingText: string
	previewText: string
	image: ImageProps
	href: URL
	link?: Link
}

function mappedWorkShowcaseLink(showcase: WorkShowcase): Link | undefined {
	const event = showcase.event
	const kind = lifeEventKindFromRawValue(event?.kind ?? "")

	if (!kind) {
		return undefined
	}

	return { kind }
}

export function mappedWorkShowcaseListItemProps(showcase: WorkShowcase): Props {
	const id = showcase._id
	const slug = showcase.slug
	const headingText = showcase.name
	const previewText = showcase.description ?? ""

	const image = {
		trailing: showcase.teaserImageTrailing?.path!,
		centered: showcase.teaserImageCentered?.path!
	}

	const href = `/work/${showcase.slug}`
	const link = mappedWorkShowcaseLink(showcase)

	return { id, slug, headingText, previewText, image, href, link }
}
