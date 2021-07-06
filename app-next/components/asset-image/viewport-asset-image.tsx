import { FunctionComponent, useRef } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import ImageDebugDisplay from "~/components/asset-image/components/asset-image-debug-display"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { desktopMediaQuery, mobileMediaQuery } from "~/components/asset-image/functions/asset-image-media"
import { scaledViewportImageSources } from "~/components/asset-image/functions/asset-image-sources"
import useRenderDevicePixelRatio from "~/components/device-pixel-ratio/render-device-pixel-ratio-hook"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Configuration

const showsDebugState = true

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

	const imageRef = useRef<HTMLImageElement>(null)
	const devicePixelRatio = useRenderDevicePixelRatio()

	return (
		<picture>
			{!devicePixelRatio ||
				(devicePixelRatio <= 1 && (
					<>
						<source srcSet={`${mobileBase}&dppx=${devicePixelRatio}`} media={mobileMediaQuery} />
						<source srcSet={`${desktopBase}&dppx=${devicePixelRatio}`} media={desktopMediaQuery} />
					</>
				))}

			{devicePixelRatio > 1 && (
				<>
					<source srcSet={`${mobileDouble}&dppx=${devicePixelRatio}`} media={mobileMediaQuery} />
					<source srcSet={`${desktopDouble}&dppx=${devicePixelRatio}`} media={desktopMediaQuery} />
				</>
			)}

			<img className={props.className} ref={imageRef} />
			{showsDebugState && <ImageDebugDisplay imageRef={imageRef} ratio={devicePixelRatio} />}
		</picture>
	)
}

export default ViewportAssetImage
