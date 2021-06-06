import { ImageFormat } from "~/api/common/library/image-request-preset"
import { UUID } from "~/api/common/library/uuid"
import { imageUrlFromComponent } from "~/api/records/asset/functions/image-record-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { URL } from "~/utils/routing/library/url"

type ImageProps = {
	trailing: URL
	centered: URL
}

type Props = {
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
		trailing: imageUrlFromComponent(showcase.teaserImageTrailing?.path, ImageFormat.Large),
		centered: imageUrlFromComponent(showcase.teaserImageCentered?.path, ImageFormat.Large)
	}

	const href = `/work/${showcase.slug}`

	return { id, slug, headingText, previewText, image, href }
}
