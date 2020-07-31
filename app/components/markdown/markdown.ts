import { Component, Vue, Prop } from "vue-property-decorator"
import { Markdown, supplementedString  } from "./markdown-form"

interface Data {
	formattedContent: string
}

@Component({
	data(): Data {
		const sourceString = this.$props["content"] as string
		const renderedString = Markdown.render(sourceString)

		return { formattedContent: supplementedString(renderedString) }
	}
})
export default class MarkdownComponent extends Vue implements Data {

	// Props

	@Prop() content!: string

	// Data

	formattedContent: string = ""

}