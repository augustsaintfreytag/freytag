import { FunctionComponent, useMemo, useRef } from "react"
import ImageDebugDisplay from "~/components/asset-image/components/asset-image-debug-display"
import { ScaledSourceSet, SingleSourceSet } from "~/components/asset-image/components/asset-image-source-sets"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { applicableAssetImageFormatsFromProps } from "~/components/asset-image/functions/asset-image-prop-mapping"
import { scaledDistinctImageSources, sourceDevicePixelRatioForValue } from "~/components/asset-image/functions/asset-image-sources"
import { AssetImageFormat } from "~/components/asset-image/library/asset-image-format"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"
import useDevicePixelRatio from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import { PropsWithClassName } from "~/types/props"
import { useInitialRenderState } from "~/utils/render/initial-render-hook"
import { URLComponent } from "~/utils/routing/library/url"

// Configuration

const showsDebugState = false

// Component

interface ImageFormatProps {
	format?: AssetImageFormat
	formats?: ViewportAssetImageFormats
}

interface Props extends PropsWithClassName, ImageFormatProps {
	src: { desktop?: URLComponent; mobile?: URLComponent }
	alt?: string
}

const ViewportImageSet: FunctionComponent<Props> = props => {
	const sources = useMemo(() => {
		const sourceURLComponents = {
			desktop: props.src.desktop ?? fallbackImageComponent,
			mobile: props.src.mobile ?? fallbackImageComponent
		}

		const formats = applicableAssetImageFormatsFromProps(props, { size: AssetImageSize.Regular })
		const sources = scaledDistinctImageSources(sourceURLComponents, formats)

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

			<img className={props.className} ref={imageRef} loading="lazy" />
			{showsDebugState && <ImageDebugDisplay imageRef={imageRef} ratio={devicePixelRatio} />}
		</picture>
	)
}

export default ViewportImageSet
