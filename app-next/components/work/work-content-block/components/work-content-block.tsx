import { FunctionComponent } from "react"
import { WorkShowcaseBlock } from "~/api/records/work-showcase/library/work-showcase"
import { workContentImageAlignmentFromRawValue } from "~/api/records/work-showcase/library/work-showcase-image-alignment"
import WorkContentHeadingBlock from "~/components/work/work-content-block/components/work-content-heading-block"
import WorkContentImageColumnBlock from "~/components/work/work-content-block/components/work-content-image-column-block"
import WorkContentImageTitleBlock from "~/components/work/work-content-block/components/work-content-image-title-block"
import WorkContentQuoteBlock from "~/components/work/work-content-block/components/work-content-quote-block"
import WorkContentTextBlock from "~/components/work/work-content-block/components/work-content-text-block"
import WorkContentVideoBlock from "~/components/work/work-content-block/components/work-content-video-block"
import { imageComponentPropsForBlock } from "~/components/work/work-content-block/functions/work-content-block-props-data-form"
import { WorkContentBlockKind as Kind } from "~/components/work/work-content-block/library/work-content-block-kind"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./work-content-block.module.sass"

type Props = PropsWithAnyChildren & {
	kind?: Kind
	block?: WorkShowcaseBlock
}

const WorkContentBlock: FunctionComponent<Props> = props => {
	const { children, kind, block } = props

	if (children) {
		return <section className={styles.block}>{props.children}</section>
	}

	if (!kind || !block) {
		return <WorkContentTextBlock text={`Missing kind or block.`} />
	}

	const { textContent, subTextContent, imageContents, videoCode, videoAspectValue } = block

	switch (kind) {
		case Kind.Heading:
			return (() => {
				if (!textContent) {
					return null
				}

				return <WorkContentHeadingBlock text={textContent} />
			})()
		case Kind.ImageTitle:
			return (() => {
				const imageProps = imageComponentPropsForBlock(block)
				const imageURL = imageProps[0]?.src

				if (!textContent || !subTextContent || !imageURL) {
					return null
				}

				return <WorkContentImageTitleBlock heading={textContent} subHeading={subTextContent} image={imageURL} />
			})()
		case Kind.Text:
			return (() => {
				if (!textContent) {
					return null
				}

				return <WorkContentTextBlock text={textContent} />
			})()
		case Kind.Images:
			return (() => {
				const imageProps = imageComponentPropsForBlock(block)
				const imageAlignment = workContentImageAlignmentFromRawValue(block.imageAlignment)

				if (!imageProps || !imageProps.length) {
					return null
				}

				return <WorkContentImageColumnBlock collection={imageProps} alignment={imageAlignment} />
			})()
		case Kind.Quote:
			return (() => {
				if (!textContent) {
					return null
				}

				return <WorkContentQuoteBlock text={block.textContent} />
			})()
		case Kind.Video:
			return (() => {
				if (!videoCode) {
					return null
				}

				return <WorkContentVideoBlock code={videoCode} aspect={videoAspectValue} />
			})()
		default:
			return <WorkContentTextBlock text={`Unsupported block kind '${kind}'`} />
	}
}

export default WorkContentBlock
