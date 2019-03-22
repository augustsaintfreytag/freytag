import { Url } from "../../library/url"

export namespace CockpitImage {

	// Options

	export class ImageOptions {

		source: Url

		mode: ImageMode = ImageMode.BestFit
		filters: Filter[] = []
		
		width: number|undefined
		height: number|undefined
		quality: number = 0.75

		includesDomainPath: boolean = false
		isBase64Encoded: boolean = false

		constructor({source, mode, filters, width, height, quality, includesDomainPath, isBase64Encoded}: {
			source: Url
			mode?: ImageMode
			filters?: Filter[]
			width?: number
			height?: number
			quality?: number
			includesDomainPath?: boolean
			isBase64Encoded?: boolean
		}) {
			this.source = source

			if (mode) {
				this.mode = mode
			}

			if (filters) {
				this.filters = filters
			}
			
			if (width) {
				this.width = width
			}

			if (height) {
				this.height = height
			}
			
			if (quality) {
				this.quality = quality
			}

			if (returnsImageData !== undefined) {
				this.returnsImageData = returnsImageData
			}
			
			if (includesDomainPath !== undefined) {
				this.includesDomainPath = includesDomainPath
			}
			
		}

		// Formed Options

		get options(): CockpitImageOptions {
			return {
				src: this.source,
				m: this.mode,
				f: this.filters,
				w: this.width,
				h: this.height,
				q: this.quality,
				d: this.includesDomainPath,
				b64: this.isBase64Encoded
			}
		}

	}

	// Library

	export type Filter = string

	export enum ImageMode {
		Thumbnail = "thumbnail",
		BestFit = "bestFit",
		Resize = "resize",
		FitToWidth = "fitToWidth",
		FitToHeight = "fitToHeight"
	}

	export interface CockpitImageOptions {
		src?: Url,
		m?: string,
		f?: string[],
		w?: number,
		h?: number,
		q?: number,
		d?: boolean,
		b64?: boolean
	}

}