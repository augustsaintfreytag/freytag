import { FunctionComponent, useRef } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import ImageDebugDisplay from "~/components/asset-image/components/asset-image-debug-display"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { scaledDistinctImageSources } from "~/components/asset-image/functions/asset-image-sources"
import { desktopMediaQuery, phoneMediaQuery, tabletMediaQuery } from "~/components/asset-image/library/media-query-values"
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
	const sources = scaledDistinctImageSources(sourceComponents, format)

	const imageRef = useRef<HTMLImageElement>(null)
	const devicePixelRatio = useRenderDevicePixelRatio()

	return (
		<picture>
			{devicePixelRatio <= 1 && (
				<>
					<source srcSet={`${sources.phone[0]}&dppx=${devicePixelRatio}`} media={phoneMediaQuery} />
					<source srcSet={`${sources.tablet[0]}&dppx=${devicePixelRatio}`} media={tabletMediaQuery} />
					<source srcSet={`${sources.desktop[0]}&dppx=${devicePixelRatio}`} media={desktopMediaQuery} />
				</>
			)}

			{devicePixelRatio > 1 && (
				<>
					<source srcSet={`${sources.phone[1]}&dppx=${devicePixelRatio}`} media={phoneMediaQuery} />
					<source srcSet={`${sources.tablet[1]}&dppx=${devicePixelRatio}`} media={tabletMediaQuery} />
					<source srcSet={`${sources.desktop[1]}&dppx=${devicePixelRatio}`} media={desktopMediaQuery} />
				</>
			)}

			<img className={props.className} ref={imageRef} />
			{showsDebugState && <ImageDebugDisplay imageRef={imageRef} ratio={devicePixelRatio} />}
		</picture>
	)
}

export default ViewportAssetImage
