import { ImageLink } from "~/api/records/asset/library/image-link"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import {
	WorkShowcaseContentImages,
	WorkShowcaseContentText,
	WorkShowcaseContentTitleCase,
	WorkShowcaseContentVideoEmbed
} from "~/api/records/work-showcase/library/work-showcase-content"
import { workContentImageAlignmentFromRawValue } from "~/api/records/work-showcase/library/work-showcase-image-alignment"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { Props as ContactSheetContentProps } from "~/components/work/work-content/components/work-content-contact-sheet-block"
import { Props as HeadingContentProps } from "~/components/work/work-content/components/work-content-heading-block"
import { Props as ImagesContentProps } from "~/components/work/work-content/components/work-content-images-block"
import { Props as QuoteContentProps } from "~/components/work/work-content/components/work-content-quote-block"
import { Props as TextContentProps } from "~/components/work/work-content/components/work-content-text-block"
import { Props as TitleCaseContentProps } from "~/components/work/work-content/components/work-content-title-case-block"
import { Props as VideoEmbedContentProps } from "~/components/work/work-content/components/work-content-video-block"
import { WorkContentBlockKind, workContentBlockKindFromRawValue } from "~/components/work/work-content/library/work-content-block-kind"
import { ImageFigureProps } from "~/components/work/work-image-figure/work-image-figure"
import { hashValue } from "~/utils/hash/hash"

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

export function imagesContentPropsFromContent(showcase: WorkShowcase, block: WorkShowcaseContentImages): ImagesContentProps {
	const imageFormat = block.imageContents.length > 1 ? AssetImageSize.Regular : AssetImageSize.Large
	const collection: ImageFigureProps[] = block.imageContents.map(imageContent => {
		return {
			anchor: imageAnchorIdentifier(showcase, imageContent),
			src: imageContent.path,
			imageFormat: imageFormat,
			caption: imageContent.meta?.title
		}
	})

	return {
		collection: collection,
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
			link: asset.path,
			label: label
		}
	})()

	return {
		heading: block.headingContent,
		subHeading: block.subContent,
		cover: block.imageContent?.path,
		callToAction: callToAction
	}
}

export function contactSheetContentPropsFromContent(showcase: WorkShowcase): ContactSheetContentProps {
	const imageBlocks = showcase.blocks
		.filter(blockLink => {
			const kind = workContentBlockKindFromRawValue(blockLink.field.name)
			return kind === WorkContentBlockKind.Images
		})
		.map(imageBlockLink => {
			return imageBlockLink.value as WorkShowcaseContentImages
		})

	const props: ContactSheetContentProps = {
		images: []
	}

	for (const imageBlock of imageBlocks) {
		for (const imageContent of imageBlock.imageContents) {
			props.images.push({
				anchor: imageAnchorIdentifier(showcase, imageContent),
				image: imageContent
			})
		}
	}

	return props
}

// Utility

function imageAnchorIdentifier(showcase: WorkShowcase, image: ImageLink): string {
	return `${showcase._id}-${hashValue(image.path)}`
}
