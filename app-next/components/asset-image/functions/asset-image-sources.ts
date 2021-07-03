import { CockpitAssetPathForm, CockpitImageRequest } from "cockpit-access"
import { ImageFormat, imageRequest } from "~/api/common/library/image-request-preset"
import { URL } from "~/utils/routing/library/url"

// Sources

export const retinaResolutionScaleFactor = 1.5
export const retinaQualityOptimizationFactor = 0.85

function roundedResolutionValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor)
}

function roundedQualityValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor * 100) / 100
}

export function scaledImageSources(component: URL, baseFormat: ImageFormat): [URL, URL] {
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
