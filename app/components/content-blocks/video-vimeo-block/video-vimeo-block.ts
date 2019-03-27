import { Component, Vue } from "vue-property-decorator"
import VimeoPlayerComponent from "~/components/vimeo-player/vimeo-player.vue"

@Component({
	props: ["contentBlock"],

	components: {
		VimeoPlayerComponent
	}
})
export default class VideoVimeoBlockComponent extends Vue {}