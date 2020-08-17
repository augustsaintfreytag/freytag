import Markdown from "@/components/markdown/markdown.vue"
import { ContentBlock } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
	components: {
		Markdown
	}
})
export default class TextColumnContentBlock extends Vue {

	@Prop() contentBlock!: ContentBlock

}