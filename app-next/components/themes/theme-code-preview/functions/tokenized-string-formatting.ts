import { range } from "~/utils/range/range"
import { ThemeFormatKey } from "../library/theme-format-key"
import { SyntaxToken, TokenizedString } from "../library/tokenized-string"
import { combineTokenizedStrings } from "./tokenized-string-combine"
import { truncatedTokenizedString } from "./tokenized-string-truncate"

export function truncationTokenizedString(): TokenizedString {
	return new TokenizedString([new SyntaxToken("(…)", ThemeFormatKey.Comment)])
}

export function repeatedTokenizedString(tokenizedString: TokenizedString, numberOfBlocks: number): TokenizedString {
	const repeatedTokenizedStrings = range(0, numberOfBlocks).map(() => tokenizedString)
	const tokenizedStrings: TokenizedString[] = []

	for (const tokenizedString of repeatedTokenizedStrings) {
		tokenizedStrings.push(tokenizedString, TokenizedString.newParagraph)
	}

	tokenizedStrings.pop()
	return combineTokenizedStrings(...tokenizedStrings)
}

export function formattedTruncatedTokenizedString(
	tokenizedString: TokenizedString,
	numberOfBlocks: number,
	maxNumberOfLines: number
): TokenizedString {
	let content = tokenizedString

	content = repeatedTokenizedString(tokenizedString, numberOfBlocks)
	content = truncatedTokenizedString(content, maxNumberOfLines - 2)
	content = combineTokenizedStrings(content, TokenizedString.newParagraph, truncationTokenizedString())

	return content
}
