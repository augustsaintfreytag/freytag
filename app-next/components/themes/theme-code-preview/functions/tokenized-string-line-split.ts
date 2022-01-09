import { SyntaxToken, TokenizedString } from "~/components/themes/theme-code-preview/library/tokenized-string"

export function tokenizedStringByLines(tokenizedString: TokenizedString): SyntaxToken[][] {
	const lines: SyntaxToken[][] = []
	let lastSplitIndex = 0

	tokenizedString.tokens.forEach((token, index) => {
		if (token.word !== "\n" && index !== tokenizedString.tokens.length - 1) {
			return
		}

		lines.push(tokenizedString.tokens.slice(lastSplitIndex, index + 1))
		lastSplitIndex = index + 1
	})

	return lines
}
