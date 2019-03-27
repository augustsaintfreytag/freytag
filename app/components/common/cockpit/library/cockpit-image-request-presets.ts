import { CockpitImage } from "../models/cockpit-image-request"

export namespace CockpitImageRequestPreset {

	const defaultQuality = 75

	// Library

	export enum Format {

		Small = "small",
		Regular = "regular",
		Large = "large"
	
	}

	type PresetsByFormat = {[key: string]: CockpitImage.ImageRequest}

	// Preset Preparation

	const presets: PresetsByFormat = {}

	presets[Format.Small] = new CockpitImage.ImageRequest({
		mode: CockpitImage.ImageMode.BestFit,
		width: 800,
		quality: defaultQuality
	})

	presets[Format.Regular] = new CockpitImage.ImageRequest({
		mode: CockpitImage.ImageMode.BestFit,
		width: 1400,
		quality: defaultQuality
	})

	presets[Format.Large] = new CockpitImage.ImageRequest({
		mode: CockpitImage.ImageMode.BestFit,
		width: 1800,
		quality: defaultQuality
	})

	// Preset Supply

	export function preset(format: Format): CockpitImage.ImageRequest {
		const preset = presets[format]
		
		if (!preset) {
			throw new TypeError(`Supplied format is not valid, can not return image request preset.`)
		}

		return preset
	}

}