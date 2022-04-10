import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum WorkContentBlockKind {
	Divider = "divider",
	Text = "text",
	Images = "images",
	ContentEmbed = "content_embed",
	VideoEmbed = "video_embed",
	TitleCase = "title_case",
	ContactSheet = "contact_sheet"
}

export const allWorkContentBlockKind: WorkContentBlockKind[] = [
	WorkContentBlockKind.Divider,
	WorkContentBlockKind.Text,
	WorkContentBlockKind.Images,
	WorkContentBlockKind.ContentEmbed,
	WorkContentBlockKind.VideoEmbed,
	WorkContentBlockKind.TitleCase,
	WorkContentBlockKind.ContactSheet
]

export function workContentBlockKindFromRawValue(rawValue: string | undefined): WorkContentBlockKind | undefined {
	return enumCaseFromRawValue(rawValue, allWorkContentBlockKind)
}
