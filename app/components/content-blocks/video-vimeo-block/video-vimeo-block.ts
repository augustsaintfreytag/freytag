import { Component, Vue, Prop } from "vue-property-decorator"
import VimeoPlayerComponent from "~/components/vimeo-player/vimeo-player.vue"
import { Content } from "~/components/common/storage/models/content-block"

@Component({
	components: {
		VimeoPlayerComponent
	}
})
export default class VideoVimeoBlockComponent extends Vue {

	@Prop() contentBlock!: Content.Block

}