import { Component, Vue } from "vue-property-decorator"
import Markdown from "markdown-it"

namespace Modules {

	export const markdown = Markdown({
		linkify: true
	})

	export function supplemented(input: string): string {
		return withSupplementedAnchors(input)
	}

	export function withSupplementedAnchors(input: string): string {
		return input.replace(/(<a\s*href="[^/].+?")(\s*>)/g, "$1 target=\"_blank\" rel=\"noopener\"$2")
	}

}

@Component({
	props: [
		"content"
	],

	data() {
		const sourceString = this.$props["content"] as string
		const renderedString = Modules.markdown.render(sourceString)

		return { output: Modules.supplemented(renderedString) }
	}
})
export default class MarkdownComponent extends Vue {}