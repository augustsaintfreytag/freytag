import { AssetImageSize } from "~/components/asset-image/library/image-size"

export interface AssetImageCropValues {
	height: number
	factor: number
}

export interface AssetImageFormat {
	size: AssetImageSize
	crop?: AssetImageCropValues
}
