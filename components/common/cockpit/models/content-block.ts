import { Image } from "./image"
import { CockpitEntry } from "./cockpit-entry"
import MetaData from "./meta-data"

export namespace Content {

	// Live Models

	export interface Block {

		form: Form|undefined
		meta: MetaData

	}

	export class TextQuoteBlock implements Block {

		form: Form|undefined
		textContent: string|undefined
		meta: MetaData

		constructor(entry: BlockEntry) {
			this.form = (entry.form as Form) || undefined
			this.textContent = entry.textContent || undefined
			this.meta = new MetaData(entry)
		}

	}

	export class TextColumnBlock extends TextQuoteBlock {}

	export class ImageColumnsBlock implements Block {

		form: Form|undefined
		imageContents: Image.Content[]
		meta: MetaData

		constructor(entry: BlockEntry) {
			if (entry.form !== Form.ImageColumns) {
				throw new TypeError(`Entry has incompatible form '${entry.form}', expected image columns block.`)
			}

			this.form = (entry.form as Form) || undefined
			this.imageContents = (entry.imageContents || []).map(imageContentEntry => {
				return new Image.Content(imageContentEntry.value)
			})
			this.meta = new MetaData(entry)
		}

	}

	export class VideoVimeoBlock implements Block {

		form: Form|undefined
		videoCode: string|undefined
		meta: MetaData

		constructor(entry: BlockEntry) {
			this.form = entry.form as Form
			this.videoCode = entry.videoCode || undefined
			this.meta = new MetaData(entry)
		}

	}

	export enum Form {

		TextQuote = "Text (Quote)",
		TextColumn = "Text (Column)",
		ImageColumns = "Images (Columns)",
		VideoVimeo = "Video (Vimeo)"

	}

	// Stored Models

	export interface BlockEntry extends CockpitEntry {

		form: string|Form
		identifierItem: string
		identifierGroup: string
		textContent: string
		imageContents: BlockRepeatedImageEntry[]|undefined
		videoCode: string

	}

	export interface BlockRepeatedEntry<ValueObject> {

		field: {type: string, label: string}
		value: ValueObject

	}

	export type BlockRepeatedImageEntry = BlockRepeatedEntry<Image.ContentEntry>

}