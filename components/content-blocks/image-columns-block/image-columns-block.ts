import { Component, Vue } from "vue-property-decorator"
import { Content } from "~/components/common/storage/models/content-block"

@Component({

	props: ["contentBlock"],

	computed: {
		imageContentDesignation(): string {
			const contentBlock = this.$props.contentBlock as Content.ImageColumnsBlock
			const numberOfImageContents = contentBlock.imageContents.length

			if (numberOfImageContents === 1) {
				return "single"
			}

			if (numberOfImageContents === 2) {
				return "dual"
			}

			if (numberOfImageContents >= 3) {
				return "full"
			}

			return "none"
		}
	}

})
export default class ImageColumnsBlockComponent extends Vue {}