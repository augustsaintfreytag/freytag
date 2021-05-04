import { ImageFigureProps } from "~/components/image-figure/image-figure"
import { intervalFromFragment } from "~/utils/api/common/functions/date-conversion"
import { imageUrlFromComponent } from "~/utils/api/records/image/functions/image-record-data-access"
import { ImageRecord, isImageRecord } from "~/utils/api/records/image/library/image-record"
import { LifeEventKind, lifeEventKindFromRawValue } from "~/utils/api/records/life-event/library/life-event-kind"
import { WorkShowcase, WorkShowcaseBlock } from "~/utils/api/records/work-showcase/library/work-showcase"
import { OpenDateInterval } from "~/utils/date/library/intervals"

// Link Props

type LinkProperties = {
	kind: LifeEventKind
	title: string
	interval: OpenDateInterval
}

export function linkPropsForShowcase(showcase: WorkShowcase): LinkProperties | undefined {
	const event = showcase.event

	if (!event) {
		return undefined
	}

	const eventKind = lifeEventKindFromRawValue(event.kind)
	const eventInterval = intervalFromFragment(event)

	if (!eventKind || !eventInterval) {
		return undefined
	}

	return {
		kind: eventKind,
		title: event.name,
		interval: eventInterval
	}
}

// Image Props

type Component = ImageRecord | string

function imagePropsForComponentCouple(leftComponent: Component, rightComponent?: Component): ImageFigureProps | undefined {
	if (!isImageRecord(leftComponent)) {
		return undefined
	}

	if (typeof rightComponent !== "string") {
		return {
			src: imageUrlFromComponent(leftComponent.path)
		}
	}

	return {
		src: imageUrlFromComponent(leftComponent.path),
		caption: rightComponent
	}
}

export function imagePropsForBlock(block: WorkShowcaseBlock): ImageFigureProps[] {
	const imageContents = block.imageContents

	if (!imageContents) {
		return []
	}

	const imagePropCollection: ImageFigureProps[] = []

	for (let index = 0; index < imageContents.length; index++) {
		const leftComponent = imageContents[index].value
		const rightComponent = imageContents[index + 1]?.value
		const imageProperties = imagePropsForComponentCouple(leftComponent, rightComponent)

		if (!imageProperties) {
			continue
		}

		imagePropCollection.push(imageProperties)
	}

	return imagePropCollection
}
