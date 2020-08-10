import { Component, Prop, Vue } from "vue-property-decorator"
import { Markdown } from "./markdown-form"

interface Data {
	formattedContent: string
}

@Component
export default class MarkdownComponent extends Vue implements Data {

	// Props

	@Prop() content!: string

	// Data

	get formattedContent(): string {
		return Markdown.render(this.content)
	}

}