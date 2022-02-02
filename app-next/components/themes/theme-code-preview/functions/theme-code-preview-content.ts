import { ThemeCodePreviewContent } from "~/components/themes/theme-code-previews/theme-code-previews"
import { markdownTokenizedString, swiftTokenizedString, typeScriptTokenizedString } from "~/utils/tokenized-string/functions/tokenized-string-presets"

export function themeCodePreviewContents(): ThemeCodePreviewContent[] {
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
