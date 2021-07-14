import { CockpitImageOptions, CockpitImageRequest } from "cockpit-access"
import { AssetImageSize } from "~/components/asset-image/library/image-size"

// Library

enum ImageCompressionQuality {
	low = 65,
	default = 80,
	high = 95
}

// Preset Supply

export function imageRequest(size: AssetImageSize): CockpitImageRequest {
	switch (size) {
		case AssetImageSize.Regular:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 700,
				quality: ImageCompressionQuality.default
			})
		case AssetImageSize.Large:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1400,
				quality: ImageCompressionQuality.default
			})
		case AssetImageSize.ExtraLarge:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 2100,
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
