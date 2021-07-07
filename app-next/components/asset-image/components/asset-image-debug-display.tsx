import { FunctionComponent, RefObject, useEffect, useMemo, useState } from "react"
import { DotsPerPixel } from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import { URL } from "~/utils/routing/library/url"
import styles from "./asset-image-debug-display.module.sass"

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
		const description = `Mode "${mode}", Width ${width}px, Quality ${quality}%, DPPX ${props.ratio}`

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

export default ImageDebugDisplay
