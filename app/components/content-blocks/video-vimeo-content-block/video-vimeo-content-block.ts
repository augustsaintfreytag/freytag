import VimeoPlayer from "@/components/vimeo-player/vimeo-player.vue"
import { ContentBlock } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
	components: {
		VimeoPlayer
	}
})
export default class VideoVimeoContentBlock extends Vue {

	@Prop() contentBlock!: ContentBlock

}