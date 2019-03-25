import { Component, Vue } from "vue-property-decorator"
import { Content } from "~/components/common/storage/models/content-block"
import { CockpitImageRequestPreset } from "~/components/common/cockpit/library/cockpit-image-request-presets"


enum ImageContentDesignation {
	None = "none",
	Single = "single",
	Dual = "dual",
	Triple = "triple",
	Full = "full"
}

@Component({

	props: ["contentBlock"],

	computed: {
		imageContentDesignation(): ImageContentDesignation {
			const contentBlock = this.$props.contentBlock as Content.ImageColumnsBlock
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
	}

})
export default class ImageColumnsBlockComponent extends Vue {

	imageFormat(designation: ImageContentDesignation): CockpitImageRequestPreset.Format {
	if (designation === ImageContentDesignation.Full) {
			return CockpitImageRequestPreset.Format.Regular
		}

		return CockpitImageRequestPreset.Format.Small
	}

}