import { CockpitAssetPathForm, CockpitImageRequest } from "cockpit-access"
import { imageRequest } from "~/api/common/library/image-request-preset"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { scaleFactors } from "~/components/asset-image/library/scale-values"
import { Viewport } from "~/components/asset-image/library/viewport"
import { ViewportAssetImageFormats, ViewportURLCouple } from "~/components/asset-image/library/viewport-sources"
import { DotsPerPixel } from "~/components/device-pixel-ratio/device-pixel-ratio-hook"
import { URLComponent } from "~/utils/routing/library/url"

// Calculation

function roundedResolutionValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor)
}

function roundedQualityValue(value: number | undefined, factor: number): number {
	return Math.round((value ?? 0) * factor * 100) / 100
}

// Request Form

function scaledImageRequests(baseSize: AssetImageSize): [CockpitImageRequest, CockpitImageRequest] {
	const baseSizeImageRequest = imageRequest(baseSize)
	const doubleSizeImageRequest = new CockpitImageRequest({
		mode: baseSizeImageRequest.mode,
		width: roundedResolutionValue(baseSizeImageRequest.width, scaleFactors.retinaResolution),
		quality: roundedQualityValue(baseSizeImageRequest.quality, scaleFactors.retinaQualityOptimization)
	})

	return [baseSizeImageRequest, doubleSizeImageRequest]
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

export function scaledImageSources(component: URLComponent, viewport: Viewport, baseSize: AssetImageSize): ViewportURLCouple {
	const [baseSizeImageRequest, doubleSizeImageRequest] = scaledImageRequests(baseSize)
	const scaleFactor = imageRequestWidthScaleFactor(viewport)

	baseSizeImageRequest.width = roundedResolutionValue(baseSizeImageRequest.width, scaleFactor)
	doubleSizeImageRequest.width = roundedResolutionValue(doubleSizeImageRequest.width, scaleFactor)

	const singleSizeSource = CockpitAssetPathForm.cockpitImage(component, baseSizeImageRequest) + "&dppx=1"
	const doubleSizeSource = CockpitAssetPathForm.cockpitImage(component, doubleSizeImageRequest) + "&dppx=2"

	return [singleSizeSource, doubleSizeSource]
}

export function scaledDistinctImageSources(
	components: { desktop: URLComponent; mobile: URLComponent },
	formats: ViewportAssetImageFormats
): { desktop: ViewportURLCouple; tablet: ViewportURLCouple; phone: ViewportURLCouple } {
	const scaledDesktopSources = scaledImageSources(components.desktop, Viewport.Desktop, formats.desktop.size)
	const scaledTabletSources = scaledImageSources(components.mobile, Viewport.Tablet, formats.tablet.size)
	const scaledPhoneSources = scaledImageSources(components.mobile, Viewport.Phone, formats.phone.size)

	return { desktop: scaledDesktopSources, tablet: scaledTabletSources, phone: scaledPhoneSources }
}
