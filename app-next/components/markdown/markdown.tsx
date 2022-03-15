import { FunctionComponent, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import { mappedAnchorMarkdownElement } from "~/components/markdown/functions/markdown-anchor-mapping"
import { mappedTextMarkdownElement } from "~/components/markdown/functions/markdown-text-mapping"
import { MarkdownComponents } from "~/components/markdown/library/types"

// Component

interface Props {
	children?: string
}

const components: MarkdownComponents = {
	a: mappedAnchorMarkdownElement,
	p: mappedTextMarkdownElement
}

const Markdown: FunctionComponent<Props> = props => {
	return useMemo(
		() => (
			<ReactMarkdown components={components} skipHtml>
				{props.children ?? ""}
			</ReactMarkdown>
		),
		[props.children]
	)
}

export default Markdown
