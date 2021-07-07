import { FunctionComponent, useRef } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import ImageDebugDisplay from "~/components/asset-image/components/asset-image-debug-display"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { scaledDistinctImageSources, ScaledURLCouples } from "~/components/asset-image/functions/asset-image-sources"
import { desktopMediaQuery, phoneMediaQuery, tabletMediaQuery } from "~/components/asset-image/library/media-query-values"
import useRenderDevicePixelRatio from "~/components/device-pixel-ratio/render-device-pixel-ratio-hook"
import { PropsWithClassName } from "~/types/props"
import { URLComponent } from "~/utils/routing/library/url"

// Configuration

const showsDebugState = true

// Source Set

enum SourceDevicePixelRatio {
	Base = 0,
	Double = 1
}

const SourceSet: FunctionComponent<{ sources: ScaledURLCouples; sourceIndex: number }> = props => {
	const { sources, sourceIndex } = props

	return (
		<>
			<source srcSet={`${sources.phone[sourceIndex]}`} media={phoneMediaQuery} />
			<source srcSet={`${sources.tablet[sourceIndex]}`} media={tabletMediaQuery} />
			<source srcSet={`${sources.desktop[sourceIndex]}`} media={desktopMediaQuery} />
		</>
	)
}

// Component

interface Props extends PropsWithClassName {
	src: { desktop?: URLComponent; mobile?: URLComponent }
	format?: ImageFormat
	alt?: string
}

const ViewportAssetImage: FunctionComponent<Props> = props => {
	const sourceURLComponents = {
		desktop: props.src.desktop ?? fallbackImageComponent,
		mobile: props.src.mobile ?? fallbackImageComponent
	}

	const format = props.format ?? ImageFormat.Regular
	const sources = scaledDistinctImageSources(sourceURLComponents, format)

	const imageRef = useRef<HTMLImageElement>(null)
	const devicePixelRatio = useRenderDevicePixelRatio()

	return (
		<picture>
			{devicePixelRatio <= 1 && <SourceSet sources={sources} sourceIndex={SourceDevicePixelRatio.Base} />}
			{devicePixelRatio > 1 && <SourceSet sources={sources} sourceIndex={SourceDevicePixelRatio.Double} />}
			<img className={props.className} ref={imageRef} />
			{showsDebugState && <ImageDebugDisplay imageRef={imageRef} ratio={devicePixelRatio} />}
		</picture>
	)
}

export default ViewportAssetImage
