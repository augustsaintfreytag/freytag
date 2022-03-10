import { CockpitAssetPathForm, CockpitImageOptions, CockpitImageRequest } from "cockpit-access"
import { imageRequest } from "~/api/cockpit/data/library/image-request-preset"
import { AssetImageCropValues, AssetImageFormat } from "~/components/asset-image/library/asset-image-format"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { scaleFactors } from "~/components/asset-image/library/scale-values"
import { Viewport } from "~/components/asset-image/library/viewport"
import { ViewportAssetImageFormats, ViewportURLCouple } from "~/components/asset-image/library/viewport-sources"
import { DotsPerPixel } from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import { URLComponent } from "~/utils/routing/library/url"

// Library

type ImageRequests = [CockpitImageRequest, CockpitImageRequest]

// Calculation

function roundedResolutionValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor)
}

function roundedQualityValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor * 100) / 100
}

// Request Form

function baseImageRequests(baseSize: AssetImageSize): ImageRequests {
	const baseSizeImageRequest = imageRequest(baseSize)
	const doubleSizeImageRequest = new CockpitImageRequest({
		mode: baseSizeImageRequest.mode,
		width: roundedResolutionValue(baseSizeImageRequest.width, scaleFactors.retinaResolution),
		quality: roundedQualityValue(baseSizeImageRequest.quality, scaleFactors.retinaQualityOptimization)
	})

	return [baseSizeImageRequest, doubleSizeImageRequest]
}

function viewportScaledImageRequests(requests: ImageRequests, viewport: Viewport): ImageRequests {
	const scaleFactor = imageRequestWidthScaleFactor(viewport)

	for (const request of requests) {
		request.width = roundedResolutionValue(request.width, scaleFactor)
	}

	return requests
}

function croppedImageRequests(requests: ImageRequests, viewport: Viewport, crop: AssetImageCropValues): ImageRequests {
	const scaleFactor = imageRequestWidthScaleFactor(viewport)

	for (const request of requests) {
		request.mode = CockpitImageOptions.Mode.Thumbnail
		request.height = roundedResolutionValue(crop.height, scaleFactor)
		request.width = roundedResolutionValue(request.width, crop.factor)
	}

	return requests
}

function imageRequestWidthScaleFactor(viewport: Viewport): number {
	switch (viewport) {
		case Viewport.Phone:
			return scaleFactors.phoneResolution
		case Viewport.Tablet:
			return scaleFactors.tabletResolution
		case Viewport.Desktop:
			return scaleFactors.desktopResolution
	}
}

// Source Access by Ratio

export enum SourceDevicePixelRatio {
	Base = 0,
	Double = 1
}

export function sourceDevicePixelRatioForValue(ratio: DotsPerPixel): SourceDevicePixelRatio {
	if (ratio > 1) {
		return SourceDevicePixelRatio.Double
	}

	return SourceDevicePixelRatio.Base
}

// Source Form

export function scaledImageSources(component: URLComponent, viewport: Viewport, format: AssetImageFormat): ViewportURLCouple {
	let requests = baseImageRequests(format.size)
	requests = viewportScaledImageRequests(requests, viewport)
	requests = (format.crop && croppedImageRequests(requests, viewport, format.crop)) ?? requests

	const [baseSizeImageRequest, doubleSizeImageRequest] = requests
	const singleSizeSource = CockpitAssetPathForm.cockpitImage(component, baseSizeImageRequest) + "&dppx=1"
	const doubleSizeSource = CockpitAssetPathForm.cockpitImage(component, doubleSizeImageRequest) + "&dppx=2"

	return [singleSizeSource, doubleSizeSource]
}

export function scaledDistinctImageSources(
	components: { desktop: URLComponent; mobile: URLComponent },
	formats: ViewportAssetImageFormats
): { desktop: ViewportURLCouple; tablet: ViewportURLCouple; phone: ViewportURLCouple } {
	const scaledDesktopSources = scaledImageSources(components.desktop, Viewport.Desktop, formats.desktop)
	const scaledTabletSources = scaledImageSources(components.mobile, Viewport.Tablet, formats.tablet)
	const scaledPhoneSources = scaledImageSources(components.mobile, Viewport.Phone, formats.phone)

	return { desktop: scaledDesktopSources, tablet: scaledTabletSources, phone: scaledPhoneSources }
}
