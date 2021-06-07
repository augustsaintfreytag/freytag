import React from "react"
import { ResolvedCollectionLink } from "~/api/records/work-showcase/library/work-showcase"
import {
	AnyWorkShowcaseContent,
	WorkShowcaseContentImages,
	WorkShowcaseContentText,
	WorkShowcaseContentTitleCase,
	WorkShowcaseContentVideoEmbed
} from "~/api/records/work-showcase/library/work-showcase-content"
import {
	WorkShowcaseTextContentFormat,
	workShowcaseTextContentFormatFromRawValue
} from "~/api/records/work-showcase/library/work-showcase-text-content-format"
import WorkContentImageColumnBlock from "~/components/work/work-content-block/components/work-content-images-block"
import WorkContentQuoteBlock from "~/components/work/work-content-block/components/work-content-quote-block"
import {
	default as WorkContentHeadingBlock,
	default as WorkContentTextBlock
} from "~/components/work/work-content-block/components/work-content-text-block"
import WorkContentTitleCaseBlock from "~/components/work/work-content-block/components/work-content-title-case-block"
import WorkContentVideoBlock from "~/components/work/work-content-block/components/work-content-video-block"
import {
	headingContentPropsFromContent,
	imagesContentPropsFromContent,
	quoteContentPropsFromContent,
	textContentPropsFromContent,
	titleCaseContentPropsFromContent,
	videoEmbedContentPropsFromContent
} from "~/components/work/work-content-block/functions/work-content-block-props-mapping"
import { workContentBlockKindFromRawValue, WorkShowcaseBlockKind as Kind } from "~/components/work/work-content-block/library/work-content-block-kind"

type AnyElement = JSX.Element

// Component Types

function typedTextContentComponentFromContent(block: WorkShowcaseContentText): AnyElement {
	const format = workShowcaseTextContentFormatFromRawValue(block.format)
	if (!format) {
		return <></>
	}

	switch (format) {
		case WorkShowcaseTextContentFormat.Text:
			return <WorkContentTextBlock {...textContentPropsFromContent(block)} />
		case WorkShowcaseTextContentFormat.Heading:
			return <WorkContentHeadingBlock {...headingContentPropsFromContent(block)} />
		case WorkShowcaseTextContentFormat.Quote:
			return <WorkContentQuoteBlock {...quoteContentPropsFromContent(block)} />
	}
}

function imagesContentComponentFromContent(block: WorkShowcaseContentImages): AnyElement {
	return <WorkContentImageColumnBlock {...imagesContentPropsFromContent(block)} />
}

function videoEmbedContentComponentFromContent(block: WorkShowcaseContentVideoEmbed): AnyElement {
	return <WorkContentVideoBlock {...videoEmbedContentPropsFromContent(block)} />
}

function titleCaseContentComponentFromContent(block: WorkShowcaseContentTitleCase): AnyElement {
	return <WorkContentTitleCaseBlock {...titleCaseContentPropsFromContent(block)} />
}

// Master Mapping

export function workContentComponentForContent(blockLink: ResolvedCollectionLink<AnyWorkShowcaseContent>): AnyElement {
	const kind = workContentBlockKindFromRawValue(blockLink.field.name)

	switch (kind) {
		case Kind.Text:
			return typedTextContentComponentFromContent(blockLink.value as WorkShowcaseContentText)
		case Kind.Images:
			return imagesContentComponentFromContent(blockLink.value as WorkShowcaseContentImages)
		case Kind.VideoEmbed:
			return videoEmbedContentComponentFromContent(blockLink.value as WorkShowcaseContentVideoEmbed)
		case Kind.TitleCase:
			return titleCaseContentComponentFromContent(blockLink.value as WorkShowcaseContentTitleCase)
		default:
			return <></>
	}
}
