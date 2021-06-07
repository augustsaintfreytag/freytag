import { ImageFormat } from "~/api/common/library/image-request-preset"
import { assetUrlFromComponent, imageUrlFromComponent } from "~/api/records/asset/functions/image-record-data-access"
import {
	WorkShowcaseContentImages,
	WorkShowcaseContentText,
	WorkShowcaseContentTitleCase,
	WorkShowcaseContentVideoEmbed
} from "~/api/records/work-showcase/library/work-showcase-content"
import { workContentImageAlignmentFromRawValue } from "~/api/records/work-showcase/library/work-showcase-image-alignment"
import { Props as HeadingContentProps } from "~/components/work/work-content/components/work-content-heading-block"
import { Props as ImagesContentProps } from "~/components/work/work-content/components/work-content-images-block"
import { Props as QuoteContentProps } from "~/components/work/work-content/components/work-content-quote-block"
import { Props as TextContentProps } from "~/components/work/work-content/components/work-content-text-block"
import { Props as TitleCaseContentProps } from "~/components/work/work-content/components/work-content-title-case-block"
import { Props as VideoEmbedContentProps } from "~/components/work/work-content/components/work-content-video-block"
import { URL } from "~/utils/routing/library/url"

export function headingContentPropsFromContent(block: WorkShowcaseContentText): HeadingContentProps {
	return {
		text: block.textContent ?? "…"
	}
}

export function textContentPropsFromContent(block: WorkShowcaseContentText): TextContentProps {
	return {
		text: block.textContent
	}
}

export function quoteContentPropsFromContent(block: WorkShowcaseContentText): QuoteContentProps {
	return {
		text: block.textContent
	}
}

export function imagesContentPropsFromContent(block: WorkShowcaseContentImages): ImagesContentProps {
	const imageFormat = block.imageContents.length > 1 ? ImageFormat.Regular : ImageFormat.Large

	const collection: { src?: URL; caption?: string }[] = block.imageContents.map(imageContent => {
		return {
			src: imageUrlFromComponent(imageContent.path, imageFormat),
			caption: imageContent.meta?.title
		}
	})

	return {
		collection,
		alignment: workContentImageAlignmentFromRawValue(block.imageAlignment)
	}
}

export function videoEmbedContentPropsFromContent(block: WorkShowcaseContentVideoEmbed): VideoEmbedContentProps {
	return {
		code: block.videoCode,
		aspect: block.videoAspectValue
	}
}

export function titleCaseContentPropsFromContent(block: WorkShowcaseContentTitleCase): TitleCaseContentProps {
	const callToAction = (() => {
		const [asset, label] = [block.downloadAsset, block.downloadLabel]

		if (!asset || !label) {
			return undefined
		}

		return {
			link: assetUrlFromComponent(asset.path),
			label: label
		}
	})()

	return {
		heading: block.headingContent,
		subHeading: block.subContent,
		image: imageUrlFromComponent(block.imageContent?.path, ImageFormat.Large),
		callToAction: callToAction
	}
}
