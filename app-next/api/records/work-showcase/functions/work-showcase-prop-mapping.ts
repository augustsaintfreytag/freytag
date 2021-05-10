import { ImageFormat } from "~/api/common/library/image-request-preset"
import { UUID } from "~/api/common/library/uuid"
import { imageUrlFromComponent } from "~/api/records/image/functions/image-record-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { URL } from "~/utils/routing/library/url"

type Props = {
	id: UUID
	slug?: string
	headingText: string
	previewText: string
	image: URL
	href: URL
}

export function mappedWorkShowcaseListItemProps(showcase: WorkShowcase): Props {
	const id = showcase._id
	const slug = showcase.slug
	const headingText = showcase.name
	const previewText = showcase.description ?? ""
	const image = imageUrlFromComponent(showcase.teaserImage?.path, ImageFormat.Large)
	const href = `/work/${showcase.slug}`

	return { id, slug, headingText, previewText, image, href }
}
