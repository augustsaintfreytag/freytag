import { ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"

// Token

export type SyntaxTokenValue = {
	word: string
	kind?: ThemeFormatKey
}

export class SyntaxToken {
	word: string
	kind?: ThemeFormatKey

	// Init

	constructor(word: string, kind?: ThemeFormatKey) {
		this.word = word
		this.kind = kind
	}

	static fromValue(value: SyntaxTokenValue): SyntaxToken {
		return new SyntaxToken(value.word, value.kind)
	}

	// Presets

	static get space(): SyntaxToken {
		return new SyntaxToken(" ")
	}

	static get indent(): SyntaxToken {
		return new SyntaxToken("    ")
	}

	static get newLine(): SyntaxToken {
		return new SyntaxToken("\n")
	}
}

// String

export class TokenizedString {
	tokens: SyntaxToken[] = []

	// Init

	constructor(tokens: SyntaxToken[]) {
		this.tokens = tokens
	}

	// Presest

	static get newLine(): TokenizedString {
		return new TokenizedString([SyntaxToken.newLine])
	}

	static get newParagraph(): TokenizedString {
		return new TokenizedString([SyntaxToken.newLine, SyntaxToken.newLine])
	}
}
