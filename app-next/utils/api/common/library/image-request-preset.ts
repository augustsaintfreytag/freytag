import { CockpitImageOptions, CockpitImageRequest } from "cockpit-access"

const defaultQuality = 75

// Library

export enum ImageRequestFormat {
	Small = "small",
	Regular = "regular",
	Large = "large"
}

// Preset Supply

export function imageRequest(format: ImageRequestFormat): CockpitImageRequest {
	switch (format) {
		case ImageRequestFormat.Small:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 600,
				quality: defaultQuality
			})
		case ImageRequestFormat.Regular:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1000,
				quality: defaultQuality
			})
		case ImageRequestFormat.Large:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1600,
				quality: defaultQuality
			})
		default:
			throw new TypeError(`Unsupported format '${format}' for image request preset.`)
	}
}
