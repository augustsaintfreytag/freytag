import { CockpitAssetPathForm } from "cockpit-access"
import { ImageFormat, imageRequest } from "~/api/common/library/image-request-preset"
import { URL } from "~/utils/routing/library/url"

const imageFallbackUrl: URL = "/assets/image-fallback.png"

export function imageUrlFromComponent(component?: string, format: ImageFormat = ImageFormat.Regular): URL {
	if (!component) {
		return imageFallbackUrl
	}

	return CockpitAssetPathForm.cockpitImage(component, imageRequest(format))
}
