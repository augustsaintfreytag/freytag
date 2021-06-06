import { CockpitEntry } from "cockpit-access"
import { CollectionAssetLink } from "~/api/records/asset/library/collection-asset-link"

export type PageGraphics = CockpitEntry & {
	indexAsset?: CollectionAssetLink
	imprintAsset?: CollectionAssetLink
	privacyAsset?: CollectionAssetLink
	pageNotFoundAsset?: CollectionAssetLink
}
