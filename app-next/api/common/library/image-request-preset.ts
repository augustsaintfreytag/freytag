import { CockpitImageOptions, CockpitImageRequest } from "cockpit-access"

// Library

enum ImageCompressionQuality {
	low = 65,
	default = 75,
	high = 85
}

export enum ImageFormat {
	Small = "s",
	Regular = "r",
	Large = "l",
	ExtraLarge = "xl"
}

// Preset Supply

export function imageRequest(format: ImageFormat): CockpitImageRequest {
	switch (format) {
		case ImageFormat.Small:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 600,
				quality: ImageCompressionQuality.default
			})
		case ImageFormat.Regular:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1000,
				quality: ImageCompressionQuality.default
			})
		case ImageFormat.Large:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1600,
				quality: ImageCompressionQuality.default
			})
		case ImageFormat.ExtraLarge:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 2200,
				quality: ImageCompressionQuality.default
			})
		default:
			throw new TypeError(`Unsupported format '${format}' for image request preset.`)
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
