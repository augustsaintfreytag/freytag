import { Component, Vue, Prop } from "vue-property-decorator"
import Markdown from "~/components/markdown/markdown.vue"
import { Content } from "~/components/common/storage/models/content-block"

@Component({
	components: {
		Markdown
	}
})
export default class TextColumnBlockComponent extends Vue {

	@Prop() contentBlock!: Content.Block

}