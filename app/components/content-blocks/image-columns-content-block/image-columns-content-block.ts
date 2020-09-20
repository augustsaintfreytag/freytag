import { Format as CockpitImageFormat } from "@/utils/cockpit/library/cockpit-image-request-presets"
import { ImageColumnsContentBlock as ImageColumnsContentBlockModel } from "@/utils/storage/models/content-block"
import type { ContentBlock } from "@/utils/storage/models/content-block"
import { Component, Prop, Vue } from "vue-property-decorator"

enum ImageContentDesignation {
	None = "none",
	Single = "single",
	Dual = "dual",
	Triple = "triple",
	Full = "full"
}

@Component({})
export default class ImageColumnsBlock extends Vue {

	@Prop() contentBlock!: ContentBlock

	get imageContentDesignation(): ImageContentDesignation {
		const contentBlock = this.contentBlock

		if (!ImageColumnsContentBlockModel.isImageColumnsBlock(contentBlock)) {
			return ImageContentDesignation.None
		}

		const numberOfImageContents = contentBlock.imageContents.length

		if (numberOfImageContents === 1) {
			return ImageContentDesignation.Single
		}

		if (numberOfImageContents === 2) {
			return ImageContentDesignation.Dual
		}

		if (numberOfImageContents === 3) {
			return ImageContentDesignation.Triple
		}

		if (numberOfImageContents >= 4) {
			return ImageContentDesignation.Full
		}

		return ImageContentDesignation.None
	}

	imageFormat(designation: ImageContentDesignation): CockpitImageFormat {
		if (designation === ImageContentDesignation.Single) {
			return CockpitImageFormat.Large
		}

		if (designation === ImageContentDesignation.Dual) {
			return CockpitImageFormat.Regular
		}

		return CockpitImageFormat.Small
	}

}