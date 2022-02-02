import { useMemo } from "react"
import { ThemeCodePreviewContent } from "~/components/themes/theme-code-previews/theme-code-previews"
import { formattedTruncatedTokenizedString } from "~/utils/tokenized-string/functions/tokenized-string-formatting"
import { themeCodePreviewContents } from "./theme-code-preview-content"

const themePreviewNumberOfBlocks = 3
const themePreviewContentNumberOfLines = 38

export function useThemeCodePreviewContents(): ThemeCodePreviewContent[] {
	return useMemo(() => {
		const contents = themeCodePreviewContents()

		for (let index = 0; index < contents.length; index++) {
			const { content, name, symbol } = contents[index]
			const formattedContent = formattedTruncatedTokenizedString(content, themePreviewNumberOfBlocks, themePreviewContentNumberOfLines)

			contents[index] = {
				content: formattedContent,
				name,
				symbol
			}
		}

		return contents
	}, [themePreviewNumberOfBlocks, themePreviewContentNumberOfLines])
}
