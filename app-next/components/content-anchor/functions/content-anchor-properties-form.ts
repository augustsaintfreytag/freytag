import { ResolvedCollectionLink } from "~/api/records/work-showcase/library/work-showcase"
import { AnyWorkShowcaseContent, WorkShowcaseContentText } from "~/api/records/work-showcase/library/work-showcase-content"
import {
	WorkShowcaseTextContentFormat,
	workShowcaseTextContentFormatFromRawValue
} from "~/api/records/work-showcase/library/work-showcase-text-content-format"
import { contentAnchorIdFromText } from "~/components/content-anchor/functions/content-anchor-form"
import { ContentAnchorProperties } from "~/components/content-anchor/library/content-anchor-properties"
import { WorkContentBlockKind, workContentBlockKindFromRawValue } from "~/components/work/work-content/library/work-content-block-kind"

export function contentAnchorPropertiesFromBlocks(blockLinks: ResolvedCollectionLink<AnyWorkShowcaseContent>[]): ContentAnchorProperties[] {
	const contentLinks: ContentAnchorProperties[] = []

	for (const blockLink of blockLinks) {
		const kind = workContentBlockKindFromRawValue(blockLink.field.name)

		if (!kind || kind !== WorkContentBlockKind.Text) {
			continue
		}

		const block = blockLink.value as WorkShowcaseContentText
		const blockFormat = workShowcaseTextContentFormatFromRawValue(block.format)

		if (blockFormat !== WorkShowcaseTextContentFormat.Heading || !block.textContent) {
			continue
		}

		contentLinks.push({
			name: block.textContent,
			anchor: contentAnchorIdFromText(block.textContent)
		})
	}

	return contentLinks
}
