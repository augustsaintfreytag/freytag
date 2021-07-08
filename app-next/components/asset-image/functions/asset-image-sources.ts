import { CockpitAssetPathForm, CockpitImageRequest } from "cockpit-access"
import { ImageFormat, imageRequest } from "~/api/common/library/image-request-preset"
import { scaleFactors } from "~/components/asset-image/library/scale-values"
import { Viewport } from "~/components/asset-image/library/viewport"
import { ViewportImageFormats, ViewportURLCouple } from "~/components/asset-image/library/viewport-sources"
import { URLComponent } from "~/utils/routing/library/url"

// Modelling

export function applicableViewportImageFormats(
	props: { format?: ImageFormat; formats?: ViewportImageFormats },
	defaultFormat: ImageFormat
): ViewportImageFormats {
	if (props.formats) {
		return props.formats
	}

	if (props.format) {
		return uniformViewportImageFormats(props.format)
	}

	return uniformViewportImageFormats(defaultFormat)
}

export function uniformViewportImageFormats(format: ImageFormat): ViewportImageFormats {
	return {
		desktop: format,
		tablet: format,
		phone: format
	}
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
		width: roundedResolutionValue(baseSizeImageRequest.width, scaleFactors.retinaQualityOptimization),
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
	formats: ViewportImageFormats
): { desktop: ViewportURLCouple; tablet: ViewportURLCouple; phone: ViewportURLCouple } {
	const scaledDesktopSources = scaledImageSources(components.desktop, Viewport.Desktop, formats.desktop)
	const scaledTabletSources = scaledImageSources(components.mobile, Viewport.Tablet, formats.tablet)
	const scaledPhoneSources = scaledImageSources(components.mobile, Viewport.Phone, formats.phone)

	return { desktop: scaledDesktopSources, tablet: scaledTabletSources, phone: scaledPhoneSources }
}
