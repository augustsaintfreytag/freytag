import { Component, Vue } from "vue-property-decorator"
import { Content } from "~/components/common/storage/models/content-block"
import Markdown from "~/components/markdown/markdown.vue"

@Component({
	components: {
		Markdown
	},

	computed: {
		textParagraphs(): string[] {
			const textContent = (this.$props.contentBlock as Content.TextColumnBlock).textContent
			if (!textContent) {
				return []
			}

			return textContent.replace(/\n+/, "\n").split("\n")
		}
	}
	props: ["contentBlock"]
})
export default class TextColumnBlockComponent extends Vue {}