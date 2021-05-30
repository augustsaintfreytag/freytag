import { FunctionComponent } from "react"
import { WorkShowcaseBlock } from "~/api/records/work-showcase/library/work-showcase"
import WorkContentHeadingBlock from "~/components/work/work-content-block/components/work-content-heading-block"
import WorkContentImageColumnBlock from "~/components/work/work-content-block/components/work-content-image-column-block"
import WorkContentQuoteBlock from "~/components/work/work-content-block/components/work-content-quote-block"
import WorkContentTextBlock from "~/components/work/work-content-block/components/work-content-text-block"
import WorkContentVideoBlock from "~/components/work/work-content-block/components/work-content-video-block"
import { imagePropsForBlock } from "~/components/work/work-content-block/functions/work-content-block-data-form"
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

	switch (kind) {
		case Kind.Heading:
			return <WorkContentHeadingBlock text={block.textContent} />
		case Kind.Text:
			return <WorkContentTextBlock text={block.textContent} />
		case Kind.Images:
			return <WorkContentImageColumnBlock collection={imagePropsForBlock(block)} />
		case Kind.Quote:
			return <WorkContentQuoteBlock text={block.textContent} />
		case Kind.Video:
			return <WorkContentVideoBlock code={block.videoCode} aspect={block.videoAspectValue} />
		default:
			return <WorkContentTextBlock text={`Unsupported block kind '${kind}'`} />
	}
}

export default WorkContentBlock
