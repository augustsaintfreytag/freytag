import { CockpitAssetPathForm, CockpitImageRequest } from "cockpit-access"
import { FunctionComponent } from "react"
import { ImageFormat, imageRequest } from "~/api/common/library/image-request-preset"
import { PropsWithClassName } from "~/types/props"
import { URL } from "~/utils/routing/library/url"

// Sources

const retinaResolutionScaleFactor = 1.5
const retinaQualityOptimizationFactor = 0.85

function roundedResolutionValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor)
}

function roundedQualityValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor * 100) / 100
}

function scaledImageSources(component: URL, baseFormat: ImageFormat): [URL, URL] {
	const baseSizeFormat = imageRequest(baseFormat)
	const doubleSizeFormat = new CockpitImageRequest({
		mode: baseSizeFormat.mode,
		width: roundedResolutionValue(baseSizeFormat.width, retinaResolutionScaleFactor),
		quality: roundedQualityValue(baseSizeFormat.quality, retinaQualityOptimizationFactor)
	})

	const singleSizePath = CockpitAssetPathForm.cockpitImage(component, baseSizeFormat)
	const doubleSizePath = CockpitAssetPathForm.cockpitImage(component, doubleSizeFormat)

	return [singleSizePath, doubleSizePath]
}

// Component

interface Props extends PropsWithClassName {
	src: URL
	format?: ImageFormat
	alt?: string
}

const SourcedImage: FunctionComponent<Props> = props => {
	const baseFormat = props.format ?? ImageFormat.Regular
	const [singleSizePath, doubleSizePath] = scaledImageSources(props.src, baseFormat)

	return <img className={props.className} src={singleSizePath} srcSet={`${singleSizePath} 1x, ${doubleSizePath} 2x`} alt={props.alt} />
}

export default SourcedImage
