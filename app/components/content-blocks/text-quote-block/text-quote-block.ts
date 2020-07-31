import { Component, Vue, Prop } from "vue-property-decorator"
import { Content } from "~/components/common/storage/models/content-block"

@Component
export default class TextQuoteBlockComponent extends Vue {

	@Prop() contentBlock!: Content.Block

}