import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { desktopMediaQuery, mobileMediaQuery } from "~/components/asset-image/functions/asset-image-media"
import { scaledViewportImageSources } from "~/components/asset-image/functions/asset-image-sources"
import useRenderDevicePixelRatio from "~/components/device-pixel-ratio/render-device-pixel-ratio-hook"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Component

interface Props extends PropsWithClassName {
	src: { desktop?: URLComponent; mobile?: URLComponent }
	format?: ImageFormat
	alt?: string
}

const ViewportAssetImage: FunctionComponent<Props> = props => {
	const sourceComponents = {
		desktop: props.src.desktop ?? fallbackImageComponent,
		mobile: props.src.mobile ?? fallbackImageComponent
	}

	const format = props.format ?? ImageFormat.Regular
	const scaledSources = scaledViewportImageSources(sourceComponents, format)
	const [desktopBase, desktopDouble] = scaledSources.desktop
	const [mobileBase, mobileDouble] = scaledSources.mobile

	const devicePixelRatio = useRenderDevicePixelRatio()

	return (
		<picture>
			{devicePixelRatio <= 1 && <source srcSet={`${mobileBase}&dppx=${devicePixelRatio}`} media={mobileMediaQuery} />}
			{devicePixelRatio > 1 && <source srcSet={`${mobileDouble}&dppx=${devicePixelRatio}`} media={mobileMediaQuery} />}

			{devicePixelRatio <= 1 && <source srcSet={`${desktopBase}&dppx=${devicePixelRatio}`} media={desktopMediaQuery} />}
			{devicePixelRatio > 1 && <source srcSet={`${desktopDouble}&dppx=${devicePixelRatio}`} media={desktopMediaQuery} />}

			<img className={props.className} />
		</picture>
	)
}

export default ViewportAssetImage
