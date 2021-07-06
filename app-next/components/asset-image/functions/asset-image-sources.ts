import { CockpitAssetPathForm, CockpitImageRequest } from "cockpit-access"
import { ImageFormat, imageRequest } from "~/api/common/library/image-request-preset"
import { URL, URLComponent } from "~/utils/routing/library/url"

// Library

export enum Viewport {
	Desktop,
	Mobile
}

type ScaledURLCouple = [URL, URL]

// Sources

const retinaResolutionScaleFactor = 1.75
const mobileResolutionScaleFactor = 0.5
const retinaQualityOptimizationFactor = 1.0

function roundedResolutionValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor)
}

function roundedQualityValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor * 100) / 100
}

function scaledImageRequests(baseFormat: ImageFormat): [CockpitImageRequest, CockpitImageRequest] {
	const baseSizeImageRequest = imageRequest(baseFormat)
	const doubleSizeImageRequest = new CockpitImageRequest({
		mode: baseSizeImageRequest.mode,
		width: roundedResolutionValue(baseSizeImageRequest.width, retinaResolutionScaleFactor),
		quality: roundedQualityValue(baseSizeImageRequest.quality, retinaQualityOptimizationFactor)
	})

	return [baseSizeImageRequest, doubleSizeImageRequest]
}

export function scaledImageSources(component: URLComponent, viewport: Viewport, baseFormat: ImageFormat): ScaledURLCouple {
	const [baseSizeImageRequest, doubleSizeImageRequest] = scaledImageRequests(baseFormat)

	if (viewport === Viewport.Mobile) {
		baseSizeImageRequest.width = roundedResolutionValue(baseSizeImageRequest.width, mobileResolutionScaleFactor)
		doubleSizeImageRequest.width = roundedResolutionValue(doubleSizeImageRequest.width, mobileResolutionScaleFactor)
	}

	const singleSizeSource = CockpitAssetPathForm.cockpitImage(component, baseSizeImageRequest)
	const doubleSizeSource = CockpitAssetPathForm.cockpitImage(component, doubleSizeImageRequest)

	return [singleSizeSource, doubleSizeSource]
}

export function scaledViewportImageSources(
	components: { desktop: URLComponent; mobile: URLComponent },
	baseFormat: ImageFormat
): { desktop: ScaledURLCouple; mobile: ScaledURLCouple } {
	const scaledDesktopSources = scaledImageSources(components.desktop, Viewport.Desktop, baseFormat)
	const scaledMobileSources = scaledImageSources(components.mobile, Viewport.Mobile, baseFormat)

	return { desktop: scaledDesktopSources, mobile: scaledMobileSources }
}
