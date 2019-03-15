import { CockpitEntry } from "./cockpit-response"
import { Image } from "./image"

export namespace Content {

	// Live Model

	export interface Block {

		form: Form|undefined

	}

	export class TextQuoteBlock implements Block {

		form: Form|undefined
		textContent: string|undefined

		constructor(entry: BlockEntry) {
			this.form = (entry.form as Form) || undefined
			this.textContent = entry.textContent || undefined
		}

	}

	export class TextColumnBlock extends TextQuoteBlock {}

	export class ImageColumnsBlock implements Block {

		form: Form|undefined
		imageContents: Image.Content[]

		constructor(entry: BlockEntry) {
			if (entry.form !== Form.ImageColumns) {
				throw new TypeError(`Entry has incompatible form '${entry.form}', expected image columns block.`)
			}

			this.form = (entry.form as Form) || undefined
			this.imageContents = (entry.imageContents || []).map(imageContentEntry => {
				return new Image.Content(imageContentEntry)
			})
		}

	}

	export enum Form {

		TextQuote = "Text (Quote)",
		TextColumn = "Text (Column)",
		ImageColumns = "Images (Columns)",
		VideoVimeo = "Video (Vimeo)"

	}

	// Stored Model

	export interface BlockEntry extends CockpitEntry {

		form: string|Form
		identifierItem: string
		identifierGroup: string
		textContent: string
		imageContents: Image.ContentEntry[]|undefined
		videoCode: string

	}

}