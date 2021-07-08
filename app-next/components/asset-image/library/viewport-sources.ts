import { ImageFormat } from "~/api/common/library/image-request-preset"
import { ViewportValues } from "~/components/asset-image/library/viewport"
import { URL } from "~/utils/routing/library/url"

export type ViewportImageFormats = ViewportValues<ImageFormat>
export type ViewportURLCouple = [URL, URL]
export type ViewportURLCouples = ViewportValues<ViewportURLCouple>
