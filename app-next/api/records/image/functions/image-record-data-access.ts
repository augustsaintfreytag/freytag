import { CockpitAssetPathForm } from "cockpit-access"
import { imageRequest, ImageRequestFormat } from "~/api/common/library/image-request-preset"
import { URL } from "~/utils/routing/library/url"

const imageFallbackUrl: URL = "/assets/image-fallback.png"

export function imageUrlFromComponent(component?: string): URL {
	if (!component) {
		return imageFallbackUrl
	}

	return CockpitAssetPathForm.cockpitImage(component, imageRequest(ImageRequestFormat.Large))
}
