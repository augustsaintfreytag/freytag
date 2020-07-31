import { Component, Vue, Prop } from "vue-property-decorator"
import { Content } from "~/components/common/storage/models/content-block"

@Component
export default class HeadingBlockComponent extends Vue {

	@Prop() contentBlock!: Content.Block

}