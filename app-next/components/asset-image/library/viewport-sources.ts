import { AssetImageFormat } from "~/components/asset-image/library/asset-image-format"
import { ViewportValues } from "~/components/asset-image/library/viewport"
import { URL } from "~/utils/routing/library/url"

export type ViewportAssetImageFormats = ViewportValues<AssetImageFormat>
export type ViewportURLCouple = [URL, URL]
export type ViewportURLCouples = ViewportValues<ViewportURLCouple>
