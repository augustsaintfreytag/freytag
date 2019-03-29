import { Component, Vue } from "vue-property-decorator"
import Markdown from "~/components/markdown/markdown.vue"

@Component({
	components: {
		Markdown
	},

	props: ["contentBlock"]
})
export default class TextColumnBlockComponent extends Vue {}