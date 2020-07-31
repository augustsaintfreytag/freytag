import { default as MarkdownModule } from "markdown-it"

export const Markdown = MarkdownModule({
	linkify: true
})

export function supplementedString(input: string): string {
	return input.replace(/(<a\s*href="[^/].+?")(\s*>)/g, "$1 target=\"_blank\" rel=\"noopener\"$2")
}