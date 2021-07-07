import { FunctionComponent, useMemo, useRef } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import ImageDebugDisplay from "~/components/asset-image/components/asset-image-debug-display"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { scaledDistinctImageSources, ScaledURLCouples } from "~/components/asset-image/functions/asset-image-sources"
import { desktopMediaQuery, phoneMediaQuery, tabletMediaQuery } from "~/components/asset-image/library/media-query-values"
import useDevicePixelRatio, { DotsPerPixel } from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import { PropsWithClassName } from "~/types/props"
import { useInitialRenderState } from "~/utils/render/initial-render-hook"
import { URLComponent } from "~/utils/routing/library/url"

// Configuration

const showsDebugState = false

// Source Set

enum SourceDevicePixelRatio {
	Base = 0,
	Double = 1
}

function sourceDevicePixelRatioForValue(ratio: DotsPerPixel): SourceDevicePixelRatio {
	if (ratio > 1) {
		return SourceDevicePixelRatio.Double
	}

	return SourceDevicePixelRatio.Base
}

const SingleSourceSet: FunctionComponent<{ sources: ScaledURLCouples; sourceIndex: number }> = props => {
	const { sources, sourceIndex } = props

	return (
		<>
			<source srcSet={`${sources.phone[sourceIndex]}`} media={phoneMediaQuery} />
			<source srcSet={`${sources.tablet[sourceIndex]}`} media={tabletMediaQuery} />
			<source srcSet={`${sources.desktop[sourceIndex]}`} media={desktopMediaQuery} />
		</>
	)
}

const ScaledSourceSet: FunctionComponent<{ sources: ScaledURLCouples }> = props => {
	const { sources } = props

	return (
		<>
			<source srcSet={`${sources.phone[0]} 1x, ${sources.phone[1]} 2x`} media={phoneMediaQuery} />
			<source srcSet={`${sources.tablet[0]} 1x, ${sources.tablet[1]} 2x`} media={tabletMediaQuery} />
			<source srcSet={`${sources.desktop[0]} 1x, ${sources.desktop[1]} 2x`} media={desktopMediaQuery} />
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
	const sources = useMemo(() => {
		const sourceURLComponents = {
			desktop: props.src.desktop ?? fallbackImageComponent,
			mobile: props.src.mobile ?? fallbackImageComponent
		}

		const format = props.format ?? ImageFormat.Regular
		const sources = scaledDistinctImageSources(sourceURLComponents, format)

		return sources
	}, [props.src])

	const didInitialRender = useInitialRenderState()
	const [devicePixelRatio] = useDevicePixelRatio()
	const imageRef = useRef<HTMLImageElement>(null)

	return (
		<picture>
			{didInitialRender ? (
				<SingleSourceSet sources={sources} sourceIndex={sourceDevicePixelRatioForValue(devicePixelRatio)} />
			) : (
				<ScaledSourceSet sources={sources} />
			)}

			<img className={props.className} ref={imageRef} />
			{showsDebugState && <ImageDebugDisplay imageRef={imageRef} ratio={devicePixelRatio} />}
		</picture>
	)
}

export default ViewportAssetImage
