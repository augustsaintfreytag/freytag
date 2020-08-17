import { ContentBlock, ImageColumnsContentBlock as ImageColumnsContentBlockModel } from "@/utils/storage/models/content-block"
import { CockpitImageRequest } from "cockpit-access"
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

	imageFormat(designation: ImageContentDesignation): CockpitImageRequest.Format {
		if (designation === ImageContentDesignation.Single) {
			return CockpitImageRequest.Format.Large
		}

		if (designation === ImageContentDesignation.Dual) {
			return CockpitImageRequest.Format.Regular
		}

		return CockpitImageRequest.Format.Small
	}

}