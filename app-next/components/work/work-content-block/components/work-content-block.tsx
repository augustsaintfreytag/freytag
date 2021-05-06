import { FunctionComponent } from "react"
import WorkContentHeadingBlock from "~/components/work/work-content-block/components/work-content-heading-block"
import WorkContentImageColumnBlock from "~/components/work/work-content-block/components/work-content-image-column-block"
import WorkContentQuoteBlock from "~/components/work/work-content-block/components/work-content-quote-block"
import WorkContentTextBlock from "~/components/work/work-content-block/components/work-content-text-block"
import { imagePropsForBlock } from "~/components/work/work-content-block/functions/work-content-block-data-form"
import { WorkContentBlockKind as Kind } from "~/components/work/work-content-block/library/work-content-block-kind"
import { WorkShowcaseBlock } from "~/utils/api/records/work-showcase/library/work-showcase"

type Props = {
	kind: Kind
	block: WorkShowcaseBlock
}

const WorkContentBlock: FunctionComponent<Props> = props => {
	const { kind, block } = props

	switch (kind) {
		case Kind.Heading:
			return <WorkContentHeadingBlock text={block.textContent} />
		case Kind.Text:
			return <WorkContentTextBlock text={block.textContent} />
		case Kind.Images:
			return <WorkContentImageColumnBlock collection={imagePropsForBlock(block)} />
		case Kind.Quote:
			return <WorkContentQuoteBlock text={block.textContent} />
		default:
			return <WorkContentTextBlock text={`Unsupported Block '${kind}'`} />
	}
}

export default WorkContentBlock
