import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum WorkContentBlockKind {
	Divider = "divider",
	Text = "text",
	Images = "images",
	VideoEmbed = "video_embed",
	TitleCase = "title_case"
}

export const allWorkContentBlockKind: WorkContentBlockKind[] = [
	WorkContentBlockKind.Divider,
	WorkContentBlockKind.Text,
	WorkContentBlockKind.Images,
	WorkContentBlockKind.VideoEmbed,
	WorkContentBlockKind.TitleCase
]

export function workContentBlockKindFromRawValue(rawValue: string | undefined): WorkContentBlockKind | undefined {
	return enumCaseFromRawValue(rawValue, allWorkContentBlockKind)
}
