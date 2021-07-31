import React from "react"
import { ResolvedCollectionLink, WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
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
import Divider from "~/components/divider/divider"
import WorkContentHeadingBlock from "~/components/work/work-content/components/work-content-heading-block"
import WorkContentImageColumnBlock from "~/components/work/work-content/components/work-content-images-block"
import WorkContentQuoteBlock from "~/components/work/work-content/components/work-content-quote-block"
import WorkContentTextBlock from "~/components/work/work-content/components/work-content-text-block"
import WorkContentTitleCaseBlock from "~/components/work/work-content/components/work-content-title-case-block"
import WorkContentVideoBlock from "~/components/work/work-content/components/work-content-video-block"
import {
	headingContentPropsFromContent,
	imagesContentPropsFromContent,
	quoteContentPropsFromContent,
	textContentPropsFromContent,
	titleCaseContentPropsFromContent,
	videoEmbedContentPropsFromContent
} from "~/components/work/work-content/functions/work-content-props-mapping"
import { WorkContentBlockKind as Kind, workContentBlockKindFromRawValue } from "~/components/work/work-content/library/work-content-block-kind"

type AnyElement = JSX.Element

// Component Types

function typedTextContentComponentFromContent(block: WorkShowcaseContentText): AnyElement {
	const format = workShowcaseTextContentFormatFromRawValue(block.format)
	if (!format) {
		return <></>
	}

	switch (format) {
		case WorkShowcaseTextContentFormat.Text:
			return <WorkContentTextBlock key={block._id} {...textContentPropsFromContent(block)} />
		case WorkShowcaseTextContentFormat.Heading:
			return <WorkContentHeadingBlock key={block._id} {...headingContentPropsFromContent(block)} />
		case WorkShowcaseTextContentFormat.Quote:
			return <WorkContentQuoteBlock key={block._id} {...quoteContentPropsFromContent(block)} />
	}
}

function imagesContentComponentFromContent(block: WorkShowcaseContentImages): AnyElement {
	return <WorkContentImageColumnBlock key={block._id} {...imagesContentPropsFromContent(block)} />
}

function videoEmbedContentComponentFromContent(block: WorkShowcaseContentVideoEmbed): AnyElement {
	return <WorkContentVideoBlock key={block._id} {...videoEmbedContentPropsFromContent(block)} />
}

function titleCaseContentComponentFromContent(block: WorkShowcaseContentTitleCase): AnyElement {
	return <WorkContentTitleCaseBlock key={block._id} {...titleCaseContentPropsFromContent(block)} />
}

function dividerComponent(content: WorkShowcase): AnyElement {
	const key = `${content._id}-divider`
	return <Divider key={key} color={content.accentColor} />
}

// Master Mapping

export function workContentComponentForContent(content: WorkShowcase, blockLink: ResolvedCollectionLink<AnyWorkShowcaseContent>): AnyElement {
	const kind = workContentBlockKindFromRawValue(blockLink.field.name)

	if (!kind) {
		return <></>
	}

	switch (kind) {
		case Kind.Text:
			return typedTextContentComponentFromContent(blockLink.value as WorkShowcaseContentText)
		case Kind.Images:
			return imagesContentComponentFromContent(blockLink.value as WorkShowcaseContentImages)
		case Kind.VideoEmbed:
			return videoEmbedContentComponentFromContent(blockLink.value as WorkShowcaseContentVideoEmbed)
		case Kind.TitleCase:
			return titleCaseContentComponentFromContent(blockLink.value as WorkShowcaseContentTitleCase)
		case Kind.Divider:
			return dividerComponent(content)
	}
}
