import { CockpitImageOptions, CockpitImageRequest } from "cockpit-access"

const defaultQuality = 75

// Library

export enum Format {

	Small = "small",
	Regular = "regular",
	Large = "large"

}

// Preset Supply

export function preset(format: Format): CockpitImageRequest {
	switch (format) {
		case Format.Small:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 600,
				quality: defaultQuality
			})
		case Format.Regular:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1000,
				quality: defaultQuality
			})
		case Format.Large:
			return new CockpitImageRequest({
				mode: CockpitImageOptions.Mode.BestFit,
				width: 1600,
				quality: defaultQuality
			})
		default:
			throw new TypeError(`Unsupported format '${format}' for image request preset.`)
	}
}