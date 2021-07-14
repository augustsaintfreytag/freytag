import { CockpitAssetPathForm } from "cockpit-access"
import { imageRequest, thumbnailImageRequest } from "~/api/common/library/image-request-preset"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { URL } from "~/utils/routing/library/url"

const imageFallbackUrl: URL = "/assets/image-fallback.png"

export function imageUrlFromComponent(component?: string, size: AssetImageSize = AssetImageSize.Regular): URL {
	if (!component) {
		return imageFallbackUrl
	}

	return CockpitAssetPathForm.cockpitImage(component, imageRequest(size))
}

export function thumbnailUrlFromComponent(component?: string): URL | undefined {
	if (!component) {
		return undefined
	}

	return CockpitAssetPathForm.cockpitImage(component, thumbnailImageRequest())
}

export function assetUrlFromComponent(component?: string): URL {
	if (!component) {
		return imageFallbackUrl
	}

	return CockpitAssetPathForm.cockpitAsset(component)
}
