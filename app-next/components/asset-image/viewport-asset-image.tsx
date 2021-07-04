import { FunctionComponent, RefObject, useEffect, useMemo, useRef, useState } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { fallbackImageComponent } from "~/components/asset-image/functions/asset-image-fallback"
import { desktopMediaQuery, mobileMediaQuery } from "~/components/asset-image/functions/asset-image-media"
import { scaledViewportImageSources } from "~/components/asset-image/functions/asset-image-sources"
import { DotsPerPixel } from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import useRenderDevicePixelRatio from "~/components/device-pixel-ratio/render-device-pixel-ratio-hook"
import { PropsWithClassName } from "~/types/props"
import { URL, URLComponent } from "~/utils/routing/library/url"
import styles from "./viewport-asset-image.module.sass"

// Helper

function assetProperties(source: URL): { mode?: string; width?: string; quality?: string } {
	const mode = source.match(/m=(.+?)&/)?.[1]
	const width = source.match(/w=(.+?)&/)?.[1]
	const quality = source.match(/q=(.+?)&/)?.[1]

	return {
		mode,
		width,
		quality
	}
}

interface ImageDebugDisplayProps {
	imageRef: RefObject<HTMLImageElement>
	ratio: DotsPerPixel
}

const ImageDebugDisplay: FunctionComponent<ImageDebugDisplayProps> = props => {
	const ref = () => props.imageRef.current

	const descriptionFromProperties = (imageSource?: URL) => {
		if (!imageSource) {
			return "<No Source>"
		}

		const { mode, width, quality } = assetProperties(imageSource)
		const description = `Mode "${mode}", Width ${width}px, Quality ${quality}%, DDPX ${props.ratio}`

		return description
	}

	const [imageSource, setImageSource] = useState<URL | undefined>(undefined)
	const description = useMemo<string>(() => {
		return descriptionFromProperties(imageSource)
	}, [imageSource, props.ratio, props.imageRef.current?.currentSrc])

	useEffect(() => {
		setImageSource(ref()?.currentSrc)
		const onImageLoad = () => setImageSource(ref()?.currentSrc)
		ref()?.addEventListener("load", onImageLoad, false)

		return () => ref()?.removeEventListener("load", onImageLoad)
	}, [])

	return <span className={styles.debug}>{description}</span>
}

// Component

interface Props extends PropsWithClassName {
	src: { desktop?: URLComponent; mobile?: URLComponent }
	format?: ImageFormat
	alt?: string
}

const ViewportAssetImage: FunctionComponent<Props> = props => {
	const showsDebugState = true

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
		<picture className={styles.holder}>
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
