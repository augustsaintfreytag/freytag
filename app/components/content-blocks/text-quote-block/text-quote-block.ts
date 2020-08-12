import { Content } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class TextQuoteBlockComponent extends Vue {

	@Prop() contentBlock!: Content.Block

}