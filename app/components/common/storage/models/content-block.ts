import { Image } from "~/components/common/storage/models/image"
import { CockpitEntry } from "~/components/common/cockpit/models/cockpit-entry"
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

			this.imageContents = []
			const entryContents = entry.imageContents || []

			for (let index=0, length = entryContents.length; index < length; index ++) {
				const imageContentEntry = ImageColumnsBlock.imageContentEntryInSequence(entryContents, index)
				const captionContentEntry = ImageColumnsBlock.captionContentEntryInSequence(entryContents, index)
				
				if (!imageContentEntry) {
					break
				}

				if (captionContentEntry) {
					index ++
				}

				const imageContent = new Image.Content(imageContentEntry, captionContentEntry)
				this.imageContents.push(imageContent)
			}

			this.form = (entry.form as Form) || undefined
			this.meta = new MetaData(entry)
		}

		private static imageContentEntryInSequence(sequence: AnyBlockRepeatedEntry[], startingIndex: number): Image.ContentEntry|undefined {
			const imageContentEntry = sequence[startingIndex] as BlockRepeatedImageEntry
			if (imageContentEntry.field.type !== "image") {
				return undefined
			}

			return imageContentEntry.value
		}

		private static captionContentEntryInSequence(sequence: AnyBlockRepeatedEntry[], startingIndex: number): string|undefined {
			const captionContentEntry = (startingIndex + 1) < sequence.length ? sequence[startingIndex + 1] as BlockRepeatedCaptionEntry : undefined
			if (!captionContentEntry || captionContentEntry.field.name !== "caption") {
				return undefined
			}

			return captionContentEntry.value
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

		field: {type: string, name?: string, label?: string}
		value: ValueObject

	}

	type BlockRepeatedImageEntry = BlockRepeatedEntry<Image.ContentEntry>
	type BlockRepeatedCaptionEntry = BlockRepeatedEntry<string>

	type AnyBlockRepeatedEntry = BlockRepeatedImageEntry|BlockRepeatedCaptionEntry
	type ImageContentEntries = {imageContentEntry: BlockRepeatedImageEntry, captionContentEntry: BlockRepeatedCaptionEntry}

}