import { SyntaxToken, TokenizedString } from "../library/tokenized-string"

export function truncatedTokenizedString(tokenizedString: TokenizedString, maxNumberOfLines: number): TokenizedString {
	const tokens: SyntaxToken[] = []
	const newLineWord = SyntaxToken.newLine.word

	let numberOfLines = 0

	for (const token of tokenizedString.tokens) {
		if (token.word === newLineWord) {
			numberOfLines++

			if (numberOfLines >= maxNumberOfLines) {
				break
			}
		}

		tokens.push(token)
	}

	return new TokenizedString(tokens)
}
