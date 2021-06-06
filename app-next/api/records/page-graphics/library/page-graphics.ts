import { CockpitEntry } from "cockpit-access"
import { ImageLink } from "~/api/records/asset/library/image-link"

export type PageGraphics = CockpitEntry & {
	indexAsset?: ImageLink
	imprintAsset?: ImageLink
	privacyAsset?: ImageLink
	pageNotFoundAsset?: ImageLink
}
