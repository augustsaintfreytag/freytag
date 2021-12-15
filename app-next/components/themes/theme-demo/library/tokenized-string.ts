import { ThemeFormatKey } from "~/components/themes/theme-demo/library/theme-format-key"

// Token

export interface SyntaxToken {
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
