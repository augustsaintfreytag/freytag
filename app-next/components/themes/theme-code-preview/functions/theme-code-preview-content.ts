import {
	markdownTokenizedString,
	swiftTokenizedString,
	typeScriptTokenizedString
} from "~/components/themes/theme-code-preview/functions/tokenized-string-presets"
import { CodeContent } from "~/components/themes/theme-code-previews/theme-code-previews"

export function themeCodePreviewContent(): CodeContent[] {
	return [
		{
			name: "Swift",
			symbol: "#Swift Symbol",
			content: swiftTokenizedString()
		},
		{
			name: "TypeScript",
			symbol: "#TypeScript Symbol",
			content: typeScriptTokenizedString()
		},
		{
			name: "Markdown",
			symbol: "#Markdown Symbol",
			content: markdownTokenizedString()
		}
	]
}
