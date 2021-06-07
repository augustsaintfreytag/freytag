import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum WorkShowcaseBlockKind {
	Text = "text",
	Images = "images",
	VideoEmbed = "video_embed",
	TitleCase = "title_case"
}

export const allWorkContentBlockKind: WorkShowcaseBlockKind[] = [
	WorkShowcaseBlockKind.Text,
	WorkShowcaseBlockKind.Images,
	WorkShowcaseBlockKind.VideoEmbed,
	WorkShowcaseBlockKind.TitleCase
]

export function workContentBlockKindFromRawValue(rawValue: string | undefined): WorkShowcaseBlockKind | undefined {
	return enumCaseFromRawValue(rawValue, allWorkContentBlockKind)
}
