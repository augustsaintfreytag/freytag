import { ContentBlock } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class HeadingBlockComponent extends Vue {

	@Prop() contentBlock!: ContentBlock

}