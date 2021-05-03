import { FunctionComponent } from "react"
import WorkContentTextBlock from "~/components/work/work-content-block/components/work-content-text-block"
import { WorkContentBlockKind as Kind } from "~/components/work/work-content-block/library/work-content-block-kind"
import { WorkShowcaseBlock } from "~/utils/api/records/work-showcase/library/work-showcase"

type Props = {
	kind: Kind
	block: WorkShowcaseBlock
}

const WorkContentBlock: FunctionComponent<Props> = props => {
	const { kind, block } = props

	switch (kind) {
		default:
			return <WorkContentTextBlock text={`Unsupported Block '${kind}'`} />
	}
}

export default WorkContentBlock
