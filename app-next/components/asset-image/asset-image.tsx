import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { scaledImageSources } from "~/components/asset-image/functions/asset-image-sources"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Component

interface Props extends PropsWithClassName {
	src: URLComponent
	format?: ImageFormat
	alt?: string
}

const AssetImage: FunctionComponent<Props> = props => {
	const baseFormat = props.format ?? ImageFormat.Regular
	const [singleSizePath, doubleSizePath] = scaledImageSources(props.src, baseFormat)

	return <img className={props.className} src={singleSizePath} srcSet={`${singleSizePath} 1x, ${doubleSizePath} 2x`} alt={props.alt} />
}

export default AssetImage
