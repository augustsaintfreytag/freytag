import { CockpitImageOptions, CockpitImageRequest } from "cockpit-access"
import { AssetImageSize } from "~/components/asset-image/library/image-size"

// Library

enum ImageCompressionQuality {
	low = 70,
	default = 80,
	high = 92
}

// Preset Supply

export function imageRequest(size: AssetImageSize): CockpitImageRequest {
	switch (size) {
		case AssetImageSize.Small:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 200,
				quality: ImageCompressionQuality.low
			})
		case AssetImageSize.Regular:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 700,
				quality: ImageCompressionQuality.default
			})
		case AssetImageSize.Large:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1800,
				quality: ImageCompressionQuality.default
			})
		case AssetImageSize.ExtraLarge:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 2200,
				quality: ImageCompressionQuality.default
			})
		default:
			throw new TypeError(`Unsupported format '${size}' for image request preset.`)
	}
}

export function thumbnailImageRequest(): CockpitImageRequest {
	return new CockpitImageRequest({
		mode: CockpitImageOptions.Mode.Thumbnail,
		quality: ImageCompressionQuality.default,
		width: 1200,
		height: 600
	})
}
