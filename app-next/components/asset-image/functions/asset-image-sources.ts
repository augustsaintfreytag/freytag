import { CockpitAssetPathForm, CockpitImageRequest } from "cockpit-access"
import { ImageFormat, imageRequest } from "~/api/common/library/image-request-preset"
import {
	phoneResolutionScaleFactor,
	retinaQualityOptimizationFactor,
	retinaResolutionScaleFactor,
	tabletResolutionScaleFactor
} from "~/components/asset-image/library/scale-values"
import { scaleFactors } from "~/components/asset-image/library/scale-values"
import { Viewport } from "~/components/asset-image/library/viewport"
import { ViewportImageFormats, ViewportURLCouple } from "~/components/asset-image/library/viewport-sources"
import { URLComponent } from "~/utils/routing/library/url"

}


// Sources

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

function imageRequestWidthScaleFactor(viewport: Viewport): number {
	switch (viewport) {
		case Viewport.Phone:
			return phoneResolutionScaleFactor
		case Viewport.Tablet:
			return tabletResolutionScaleFactor
		case Viewport.Desktop:
			return 1.0
	}
}

export function scaledImageSources(component: URLComponent, viewport: Viewport, baseFormat: ImageFormat): ViewportURLCouple {
	const [baseSizeImageRequest, doubleSizeImageRequest] = scaledImageRequests(baseFormat)
	const scaleFactor = imageRequestWidthScaleFactor(viewport)

	baseSizeImageRequest.width = roundedResolutionValue(baseSizeImageRequest.width, scaleFactor)
	doubleSizeImageRequest.width = roundedResolutionValue(doubleSizeImageRequest.width, scaleFactor)

	const singleSizeSource = `${CockpitAssetPathForm.cockpitImage(component, baseSizeImageRequest)}&dppx=1`
	const doubleSizeSource = `${CockpitAssetPathForm.cockpitImage(component, doubleSizeImageRequest)}&dppx=2`

	return [singleSizeSource, doubleSizeSource]
}

export function scaledDistinctImageSources(
	components: { desktop: URLComponent; mobile: URLComponent },
	baseFormat: ImageFormat
	const scaledDesktopSources = scaledImageSources(components.desktop, Viewport.Desktop, baseFormat)
	const scaledTabletSources = scaledImageSources(components.mobile, Viewport.Tablet, baseFormat)
	const scaledPhoneSources = scaledImageSources(components.mobile, Viewport.Phone, baseFormat)
): { desktop: ViewportURLCouple; tablet: ViewportURLCouple; phone: ViewportURLCouple } {

	return { desktop: scaledDesktopSources, tablet: scaledTabletSources, phone: scaledPhoneSources }
}
