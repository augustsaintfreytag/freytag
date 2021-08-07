import { FunctionComponent } from "react"
import SeoBlock from "~/components/seo/seo-block"

// Utility

function asideLines(text?: string): { blocks: string[]; hasBlocks: boolean } {
	const blocks = text?.trim().split("\n\n") ?? []
	const hasBlocks = blocks.length !== 0

	return { blocks, hasBlocks }
}

// Component

interface Props {
	aside?: string
}

const WorkSeo: FunctionComponent<Props> = props => {
	const { blocks: asideBlocks, hasBlocks: hasAside } = asideLines(props.aside)
	return (
		<SeoBlock>
			{hasAside &&
				asideBlocks.map((block, index) => {
					return <p key={index}>{block}</p>
				})}
		</SeoBlock>
	)
}

export default WorkSeo
