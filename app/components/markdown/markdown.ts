import { Component, Vue } from "vue-property-decorator"
import VueMarkdown from "vue-markdown"

@Component({
	components: {
		VueMarkdown
	}
})
export default class MarkdownComponent extends Vue {}