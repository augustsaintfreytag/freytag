import { ImageFigureProps } from "~/components/image-figure/image-figure"
import { imageUrlFromComponent } from "~/utils/api/records/image/functions/image-record-data-access"
import { ImageRecord, isImageRecord } from "~/utils/api/records/image/library/image-record"
import { WorkShowcaseBlock } from "~/utils/api/records/work-showcase/library/work-showcase"

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
