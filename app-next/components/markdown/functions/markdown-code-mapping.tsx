import { AnchorHTMLAttributes } from "react"
import { ReactNode } from "react-markdown"
import { MarkdownComponentArgs } from "~/components/markdown/library/types"

type Args = MarkdownComponentArgs & AnchorHTMLAttributes<HTMLParagraphElement>

const shortcutCharacters = new Set(["⌘", "⎇", "⌃", "⇧"])

function isKeyboardShortcut(string: string): boolean {
	if (!string || !string.length) {
		return false
	}

	const firstCharacter = string[0]
	return shortcutCharacters.has(firstCharacter)
}

function isMultiLine(string: string): boolean {
	return string.includes("\n")
}

function childText(children: ReactNode[] & ReactNode): string | undefined {
	if (!Array.isArray(children)) {
		return undefined
	}

	if (typeof children[0] !== "string") {
		return undefined
	}

	return children[0]
}

enum Appearance {
	Code = "code",
	CodeBlock = "code-block",
	KeyboardShortcut = "keyboard-shortcut"
}

function appearanceForChildren(children: ReactNode[] & ReactNode): Appearance {
	const elementText = childText(children)

	if (!elementText) {
		return Appearance.Code
	}

	if (isMultiLine(elementText)) {
		return Appearance.CodeBlock
	}

	if (isKeyboardShortcut(elementText)) {
		return Appearance.KeyboardShortcut
	}

	return Appearance.Code
}

export function mappedCodeMarkdownElement({ node, inline, className, children, ...props }: Args) {
	return (
		<code className={className} {...props} data-appearance={appearanceForChildren(children)}>
			{children}
		</code>
	)
}
