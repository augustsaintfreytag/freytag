import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum WorkShowcaseTextContentFormat {
	Text = "Text",
	Heading = "Heading",
	Quote = "Quote"
}

export const allWorkShowcaseTextContentFormat: WorkShowcaseTextContentFormat[] = [
	WorkShowcaseTextContentFormat.Text,
	WorkShowcaseTextContentFormat.Heading,
	WorkShowcaseTextContentFormat.Quote
]

export function workShowcaseTextContentFormatFromRawValue(rawValue: string): WorkShowcaseTextContentFormat | undefined {
	return enumCaseFromRawValue(rawValue, allWorkShowcaseTextContentFormat)
}
