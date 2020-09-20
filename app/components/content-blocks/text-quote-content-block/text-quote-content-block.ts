import type { ContentBlock } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class TextQuoteContentBlock extends Vue {

	@Prop() contentBlock!: ContentBlock

}