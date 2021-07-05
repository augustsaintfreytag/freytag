import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import ViewportAssetImage from "~/components/asset-image/viewport-asset-image"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Component

interface Props extends PropsWithClassName {
	src?: URLComponent
	format?: ImageFormat
	alt?: string
}

const AssetImage: FunctionComponent<Props> = props => {
	const source = props.src ?? fallbackImageComponent
	const format = props.format
	const sources = { desktop: source, mobile: source }

	return <ViewportAssetImage className={props.className} src={sources} format={format} alt={props.alt} />
}

export default AssetImage
