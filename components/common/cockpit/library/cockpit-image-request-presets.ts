import { CockpitImage } from "../models/cockpit-image-request";

export namespace CockpitImageRequestPreset {

	const defaultQuality = 75

	// Library

	export enum Format {

		Teaser = "teaser",
		Regular = "regular",
		Cover = "cover"
	
	}

	type PresetsByFormat = {[key: string]: CockpitImage.ImageRequest}

	// Preset Preparation

	const presets: PresetsByFormat = {}

	presets[Format.Teaser] = new CockpitImage.ImageRequest({
		mode: CockpitImage.ImageMode.BestFit,
		width: 800,
		quality: defaultQuality
	})

	presets[Format.Regular] = new CockpitImage.ImageRequest({
		mode: CockpitImage.ImageMode.BestFit,
		width: 1200,
		quality: defaultQuality
	})

	presets[Format.Cover] = new CockpitImage.ImageRequest({
		mode: CockpitImage.ImageMode.BestFit,
		width: 1600,
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