import VimeoPlayerComponent from "@/components/vimeo-player/vimeo-player.vue"
import { ContentBlock } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
	components: {
		VimeoPlayerComponent
	}
})
export default class VideoVimeoBlockComponent extends Vue {

	@Prop() contentBlock!: ContentBlock

}