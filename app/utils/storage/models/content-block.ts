import { ContentBlockKind } from "@/utils/storage/models/content-block-kind"
import { ImageContent, ImageContentEntry } from "@/utils/storage/models/image-content"
import { CockpitEntry, CockpitMetaData } from "cockpit-access"

// Types

type BlockRepeatedImageEntry = ContentBlockRepeatedEntry<ImageContentEntry>
type BlockRepeatedCaptionEntry = ContentBlockRepeatedEntry<string>

type AnyBlockRepeatedEntry = BlockRepeatedImageEntry|BlockRepeatedCaptionEntry

// Live Models

export interface ContentBlock {

	form: ContentBlockKind|undefined
	meta: CockpitMetaData

}

export class HeadingContentBlock implements ContentBlock {

	form: ContentBlockKind|undefined
	textContent: string|undefined
	meta: CockpitMetaData

	constructor(entry: ContentBlockEntry) {
		this.form = (entry.form as ContentBlockKind) || undefined
		this.textContent = entry.textContent || undefined
		this.meta = new CockpitMetaData(entry)
	}

}

export class TextQuoteContentBlock implements ContentBlock {

	form: ContentBlockKind|undefined
	textContent: string|undefined
	meta: CockpitMetaData

	constructor(entry: ContentBlockEntry) {
		this.form = (entry.form as ContentBlockKind) || undefined
		this.textContent = entry.textContent || undefined
		this.meta = new CockpitMetaData(entry)
	}

}

export class TextColumnContentBlock extends TextQuoteContentBlock {}

export class ImageColumnsContentBlock implements ContentBlock {

	form: ContentBlockKind|undefined
	imageContents: ImageContent[]
	meta: CockpitMetaData

	constructor(entry: ContentBlockEntry) {
		if (entry.form !== ContentBlockKind.ImageColumns) {
			throw new TypeError(`Entry has incompatible form '${entry.form}', expected image columns block.`)
		}

		this.imageContents = []
		const entryContents = entry.imageContents || []

		for (let index=0, length = entryContents.length; index < length; index ++) {
			const imageContentEntry = ImageColumnsContentBlock.imageContentEntryInSequence(entryContents, index)
			const captionContentEntry = ImageColumnsContentBlock.captionContentEntryInSequence(entryContents, index)
			
			if (!imageContentEntry) {
				break
			}

			if (captionContentEntry) {
				index ++
			}

			const imageContent = new ImageContent(imageContentEntry, captionContentEntry)
			this.imageContents.push(imageContent)
		}

		this.form = (entry.form as ContentBlockKind) || undefined
		this.meta = new CockpitMetaData(entry)
	}

	private static imageContentEntryInSequence(sequence: AnyBlockRepeatedEntry[], startingIndex: number): ImageContentEntry|undefined {
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

	// Type Assertion

	static isImageColumnsBlock(object: Object): object is ImageColumnsContentBlock {
		const formValue = object["form"]
		if (!formValue || formValue !== ContentBlockKind.ImageColumns) {
			return false
		}

		return true
	}

}

export class VideoVimeoContentBlock implements ContentBlock {

	form: ContentBlockKind|undefined
	videoCode: string|undefined
	videoAspectValue: string|undefined
	meta: CockpitMetaData

	constructor(entry: ContentBlockEntry) {
		this.form = entry.form as ContentBlockKind
		this.videoCode = entry.videoCode || undefined
		this.videoAspectValue = entry.videoAspectValue || undefined
		this.meta = new CockpitMetaData(entry)
	}

}

// Stored Models

export interface ContentBlockEntry extends CockpitEntry {

	form: string
	identifierItem: string
	identifierGroup: string
	textContent: string
	imageContents: BlockRepeatedImageEntry[]|undefined
	videoCode: string
	videoAspectValue: string

}

export interface ContentBlockRepeatedEntry<ValueObject> {

	field: {type: string, name?: string, label?: string}
	value: ValueObject

}