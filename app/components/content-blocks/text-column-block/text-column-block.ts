import { Component, Vue } from "vue-property-decorator"
import { Content } from "~/components/common/storage/models/content-block"

@Component({
	props: ["contentBlock"],

	computed: {
		textParagraphs(): string[] {
			const textContent = (this.$props.contentBlock as Content.TextColumnBlock).textContent
			if (!textContent) {
				return []
			}

			return textContent.replace(/\n+/, "\n").split("\n")
		}
	}
})
export default class TextColumnBlockComponent extends Vue {}