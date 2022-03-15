import { CockpitRecord } from "cockpit-access"
import { ImageLink } from "~/api/cockpit/records/asset/library/image-link"

export type PageGraphics = CockpitRecord & {
	indexAsset?: ImageLink
	indexPreview?: ImageLink
	lifeAsset?: ImageLink
	lifePreview?: ImageLink
	workAsset?: ImageLink
	workPreview?: ImageLink
	themesAsset?: ImageLink
	themesPreview?: ImageLink
	imprintAsset?: ImageLink
	privacyAsset?: ImageLink
	pageNotFoundAsset?: ImageLink
}
