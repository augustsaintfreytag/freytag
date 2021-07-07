import { UUID } from "~/api/common/library/uuid"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { URL } from "~/utils/routing/library/url"

interface ImageProps {
	trailing: URL
	centered: URL
}

interface Props {
	id: UUID
	slug?: string
	headingText: string
	previewText: string
	image: ImageProps
	href: URL
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

	return { id, slug, headingText, previewText, image, href }
}
