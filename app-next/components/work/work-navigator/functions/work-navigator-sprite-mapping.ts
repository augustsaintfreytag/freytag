import { ResolvedCollectionLink } from "~/api/records/work-showcase/library/work-showcase"
import { AnyWorkShowcaseContent, WorkShowcaseContentImages, WorkShowcaseContentText } from "~/api/records/work-showcase/library/work-showcase-content"
import { WorkShowcaseTextContentFormat } from "~/api/records/work-showcase/library/work-showcase-text-content-format"
import { workContentBlockKindFromRawValue, WorkShowcaseBlockKind } from "~/components/work/work-content/library/work-content-block-kind"
import { NavigatorSprite } from "~/components/work/work-navigator/library/work-navigator-sprite"

const Kind = WorkShowcaseBlockKind
const TextFormat = WorkShowcaseTextContentFormat

export function navigatorSpriteForBlock(blockLink: ResolvedCollectionLink<AnyWorkShowcaseContent>): NavigatorSprite | undefined {
	const kind = workContentBlockKindFromRawValue(blockLink.field.name)

	if (!kind) {
		return undefined
	}

	switch (kind) {
		case Kind.Text:
			return navigatorSpriteForTextBlock(blockLink.value as WorkShowcaseContentText)
		case Kind.Images:
			return navigatorSpriteForImageBlock(blockLink.value as WorkShowcaseContentImages)
		case Kind.VideoEmbed:
			return NavigatorSprite.Video
		case Kind.TitleCase:
			return NavigatorSprite.TitleCase
	}
}

function navigatorSpriteForTextBlock(block: WorkShowcaseContentText): NavigatorSprite {
	switch (block.format) {
		case TextFormat.Text:
			return NavigatorSprite.Text
		case TextFormat.Heading:
			return NavigatorSprite.Heading
		case TextFormat.Quote:
			return NavigatorSprite.Quote
	}
}

function navigatorSpriteForImageBlock(block: WorkShowcaseContentImages): NavigatorSprite {
	const numberOfImages = block.imageContents.length

	if (numberOfImages === 2) {
		return NavigatorSprite.ImageTwo
	}

	if (numberOfImages === 3) {
		return NavigatorSprite.ImageThree
	}

	if (numberOfImages >= 4) {
		return NavigatorSprite.ImageMany
	}

	return NavigatorSprite.Image
}
