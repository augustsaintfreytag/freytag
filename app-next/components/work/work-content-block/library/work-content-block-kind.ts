export enum WorkContentBlockKind {
	Heading = "Heading",
	Text = "Text",
	Quote = "Quote",
	Images = "Images",
	Video = "Video"
}

export const allWorkContentBlockKind: WorkContentBlockKind[] = [
	WorkContentBlockKind.Heading,
	WorkContentBlockKind.Text,
	WorkContentBlockKind.Quote,
	WorkContentBlockKind.Images,
	WorkContentBlockKind.Video
]

// Legacy

export type LegacyWorkContentBlockKind = string

export function workContentBlockKindFromLegacy(rawValue: LegacyWorkContentBlockKind): WorkContentBlockKind | undefined {
	switch (rawValue) {
		case "Heading":
			return WorkContentBlockKind.Heading
		case "Text (Quote)":
			return WorkContentBlockKind.Quote
		case "Text (Column)":
			return WorkContentBlockKind.Text
		case "Images (Column)":
			return WorkContentBlockKind.Images
		case "Video (Vimeo)":
			return WorkContentBlockKind.Video
		default:
			return undefined
	}
}

/* 	Previous Kinds:

	Heading = "Heading",
	TextQuote = "Text (Quote)",
	TextColumn = "Text (Column)",
	ImageColumns = "Images (Columns)",
	VideoVimeo = "Video (Vimeo)"
*/
