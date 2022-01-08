import { CockpitAssetPathForm, Context } from "cockpit-access"
import { imageRequest, thumbnailImageRequest } from "~/api/common/library/image-request-preset"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { URL } from "~/utils/routing/library/url"

const routeCockpitUrl: URL = "/cockpit"
const imageFallbackUrl: URL = "/assets/image-fallback.png"

export function imageUrlFromComponent(component?: string, size: AssetImageSize = AssetImageSize.Regular, context: Context = Context.Client): URL {
	if (!component) {
		return imageFallbackUrl
	}

	return CockpitAssetPathForm.cockpitImage(component, imageRequest(size), context)
}

export function thumbnailUrlFromComponent(component?: string, context: Context = Context.Client): URL | undefined {
	if (!component) {
		return undefined
	}

	return CockpitAssetPathForm.cockpitImage(component, thumbnailImageRequest(), context)
}

export function assetUrlFromComponent(component: string, context: Context = Context.Client): URL {
	return CockpitAssetPathForm.cockpitAsset(component, context)
}

export function routedAssetUrlFromComponent(component: string): URL {
	const localPath = CockpitAssetPathForm.cockpitAssetComponent(component)
	return `${routeCockpitUrl}${localPath}`
}
