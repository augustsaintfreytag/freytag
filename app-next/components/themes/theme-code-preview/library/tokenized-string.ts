import { ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"

// Token

export type SyntaxTokenValue = {
	word: string
	kind?: ThemeFormatKey
}

// String

export class TokenizedString {
	tokens: SyntaxToken[] = []

	constructor(tokens: SyntaxToken[]) {
		this.tokens = tokens
	}
}
