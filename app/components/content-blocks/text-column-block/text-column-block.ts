import Markdown from "@/components/markdown/markdown.vue"
import { Content } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
	components: {
		Markdown
	}
})
export default class TextColumnBlockComponent extends Vue {

	@Prop() contentBlock!: Content.Block

}