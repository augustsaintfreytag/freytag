import { FunctionComponent } from "react"
import Reiteration from "~/components/reiteration/reiteration"

// Utility

function asideLines(text?: string): { blocks: string[]; hasBlocks: boolean } {
	const blocks = text?.trim().split("\n") ?? []
	const hasBlocks = blocks.length !== 0

	return { blocks, hasBlocks }
}

// Component

interface Props {
	aside?: string
}

const WorkReiteration: FunctionComponent<Props> = props => {
	const { blocks: asideBlocks, hasBlocks: hasAside } = asideLines(props.aside)

	return (
		<Reiteration>
			{hasAside &&
				asideBlocks.map((block, index) => {
					return <p key={index}>{block}</p>
				})}
		</Reiteration>
	)
}

export default WorkReiteration
