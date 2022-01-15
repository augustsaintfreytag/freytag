import { FunctionComponent } from "react"
import AssetImageSet from "~/components/asset-image/asset-image-set"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { AssetImageFormat } from "~/components/asset-image/library/asset-image-format"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Component

interface Props extends PropsWithClassName {
	src?: URLComponent
	format?: AssetImageFormat
	formats?: ViewportAssetImageFormats
	alt?: string
	lazy?: boolean
}

const AssetImage: FunctionComponent<Props> = props => {
	const source = props.src ?? fallbackImageComponent
	const { format, formats } = props
	const sources = { desktop: source, mobile: source }

	return <AssetImageSet className={props.className} src={sources} format={format} formats={formats} alt={props.alt} lazy={props.lazy} />
}

export default AssetImage
