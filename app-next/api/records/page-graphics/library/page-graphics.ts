import { CockpitEntry } from "cockpit-access"
import { ImageRecord } from "~/api/records/image/library/image-record"

export type PageGraphics = CockpitEntry & {
	indexAsset?: ImageRecord
}
