import { CockpitEntry } from "cockpit-access"
import { ImageLink } from "~/api/records/asset/library/image-link"

export type PageGraphics = CockpitEntry & {
	indexAsset?: ImageLink
	indexPreview?: ImageLink
	lifeAsset?: ImageLink
	lifePreview?: ImageLink
	workAsset?: ImageLink
	workPreview?: ImageLink
	imprintAsset?: ImageLink
	privacyAsset?: ImageLink
	pageNotFoundAsset?: ImageLink
}
