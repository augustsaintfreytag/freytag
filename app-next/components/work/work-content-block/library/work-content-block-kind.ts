import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum WorkContentBlockKind {
	Heading = "Heading",
	TitleImage = "Title Image",
	Text = "Text",
	Quote = "Quote",
	Images = "Images",
	Video = "Video"
}

export const allWorkContentBlockKind: WorkContentBlockKind[] = [
	WorkContentBlockKind.Heading,
	WorkContentBlockKind.TitleImage,
	WorkContentBlockKind.Text,
	WorkContentBlockKind.Quote,
	WorkContentBlockKind.Images,
	WorkContentBlockKind.Video
]

export function workContentBlockKindFromRawValue(rawValue: string): WorkContentBlockKind | undefined {
	return enumCaseFromRawValue(rawValue, allWorkContentBlockKind)
}
