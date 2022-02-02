import { SyntaxToken, TokenizedString } from "../library/tokenized-string"

export function combineTokenizedStrings(...tokenizedStrings: TokenizedString[]): TokenizedString {
	const tokens: SyntaxToken[] = []

	for (const tokenizedString of tokenizedStrings) {
		const lastInsertedTokenIsNewLine = tokens[tokens.length - 1]?.word === SyntaxToken.newLine.word
		const newTokenStartsWithNewLine = tokenizedString.tokens[0]?.word === SyntaxToken.newLine.word

		if (lastInsertedTokenIsNewLine && newTokenStartsWithNewLine) {
			tokens.pop()
		}

		tokens.push(...tokenizedString.tokens)
	}

	return new TokenizedString(tokens)
}
