import { FunctionComponent, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import { mappedAnchorMarkdownElement } from "~/components/markdown/functions/markdown-anchor-mapping"
import { mappedHighlightMarkdownElement } from "~/components/markdown/functions/markdown-highlight-mapping"
import { MarkdownComponents } from "~/components/markdown/library/types"

// Component

interface Props {
	children?: string
}

const components: MarkdownComponents = {
	strong: mappedHighlightMarkdownElement,
	a: mappedAnchorMarkdownElement
}

const QuotationMarkdown: FunctionComponent<Props> = props => {
	return useMemo(
		() => (
			<ReactMarkdown components={components} skipHtml>
				{props.children ?? ""}
			</ReactMarkdown>
		),
		[props.children]
	)
}

export default QuotationMarkdown
