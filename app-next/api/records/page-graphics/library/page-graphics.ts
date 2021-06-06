import { CockpitEntry } from "cockpit-access"
import { CollectionAssetRecord } from "~/api/records/asset/library/collection-asset-record"

export type PageGraphics = CockpitEntry & {
	indexAsset?: CollectionAssetRecord
	imprintAsset?: CollectionAssetRecord
	privacyAsset?: CollectionAssetRecord
	pageNotFoundAsset?: CollectionAssetRecord
}
