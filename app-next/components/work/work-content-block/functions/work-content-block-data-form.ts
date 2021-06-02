import { AssetRecord } from "~/api/records/asset/library/asset-record"
import { assetUrlFromComponent, imageUrlFromComponent } from "~/api/records/image/functions/image-record-data-access"
import { ImageRecord } from "~/api/records/image/library/image-record"
import { WorkShowcaseBlock, WorkShowcaseMediaComponent } from "~/api/records/work-showcase/library/work-showcase"
import { URL } from "~/utils/routing/library/url"

// Api Media Types

enum FieldName {
	Image = "image",
	Caption = "caption",
	Video = "video",
	Cover = "cover"
}

// Media Prop Types

export enum ComponentPropsKind {
	Image,
	Video
}

type ImageComponentProps = {
	kind: ComponentPropsKind
	src?: URL
	caption?: string
}

type VideoComponentProps = {
	kind: ComponentPropsKind
	src?: URL
	cover?: URL
}

type AnyComponentProps = ImageComponentProps | VideoComponentProps

// Couplings: Image + Caption
// Couplings: Video + Cover

function imageCaptionFromComponent(component?: WorkShowcaseMediaComponent): string | undefined {
	if (!(component?.field.name === FieldName.Caption)) {
		return undefined
	}

	const caption = component.value as string
	return caption
}

function videoCoverFromComponent(component?: WorkShowcaseMediaComponent): AssetRecord | undefined {
	if (!(component?.field.name === FieldName.Cover)) {
		return undefined
	}

	const asset = component.value as AssetRecord
	return asset
}

function componentPropsForComponentCouple(
	leftComponent: WorkShowcaseMediaComponent,
	rightComponent?: WorkShowcaseMediaComponent
): AnyComponentProps | undefined {
	if (leftComponent.field.name === FieldName.Image) {
		const imageRecord = leftComponent.value as ImageRecord
		const imageCaption = imageCaptionFromComponent(rightComponent)

		return {
			kind: ComponentPropsKind.Image,
			src: imageUrlFromComponent(imageRecord.path),
			caption: imageCaption
		}
	}

	if (leftComponent.field.name === FieldName.Video) {
		const videoRecord = leftComponent.value as AssetRecord
		const videoCover = videoCoverFromComponent(rightComponent)

		return {
			kind: ComponentPropsKind.Video,
			src: assetUrlFromComponent(videoRecord.path),
			cover: imageUrlFromComponent(videoCover?.path)
		}
	}

	return undefined
}

export function componentPropsForBlock(block: WorkShowcaseBlock): AnyComponentProps[] {
	const mediaContents = block.imageContents

	if (!mediaContents) {
		return []
	}

	const propCollection: AnyComponentProps[] = []

	for (let index = 0; index < mediaContents.length; index++) {
		const leftComponent = mediaContents[index]
		const rightComponent = mediaContents[index + 1]
		const imageProperties = componentPropsForComponentCouple(leftComponent, rightComponent)

		if (!imageProperties) {
			continue
		}

		propCollection.push(imageProperties)
	}

	debugger
	return propCollection
}

export function imageComponentPropsForBlock(block: WorkShowcaseBlock): ImageComponentProps[] {
	return componentPropsForBlock(block).filter(props => props.kind === ComponentPropsKind.Image)
}

export function videoComponentPropsForBlock(block: WorkShowcaseBlock): ImageComponentProps[] {
	return componentPropsForBlock(block).filter(props => props.kind === ComponentPropsKind.Video)
}
