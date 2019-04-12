import { Component, Vue } from "vue-property-decorator"
import Markdown from "markdown-it"

const markdown = Markdown()

@Component({
	props: [
		"content"
	],

	data() {
		const sourceString = this.$props["content"] as string
		const renderedString = markdown.render(sourceString)

		return { output: renderedString }
	}
})
export default class MarkdownComponent extends Vue {}