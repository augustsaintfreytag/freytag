import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { ViewportImageFormats } from "~/components/asset-image/library/viewport-sources"
import ViewportImageSet from "~/components/asset-image/viewport-image-set"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Component

interface Props extends PropsWithClassName {
	src?: URLComponent
	format?: ImageFormat
	formats?: ViewportImageFormats
	alt?: string
}

const ViewportImage: FunctionComponent<Props> = props => {
	const source = props.src ?? fallbackImageComponent
	const { format, formats } = props
	const sources = { desktop: source, mobile: source }

	return <ViewportImageSet className={props.className} src={sources} format={format} formats={formats} alt={props.alt} />
}

export default ViewportImage