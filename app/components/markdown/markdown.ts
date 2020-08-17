import { Component, Prop, Vue } from "vue-property-decorator"
import { MarkdownProvider } from "./functions/markdown-provider"

interface Data {
	formattedContent: string
}

@Component({})
export default class Markdown extends Vue implements Data {

	// Props

	@Prop() content!: string

	// Data

	get formattedContent(): string {
		return MarkdownProvider.render(this.content)
	}

}