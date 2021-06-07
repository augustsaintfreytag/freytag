import { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import { mappedHighlightMarkdownElement } from "~/components/markdown/functions/markdown-highlight-mapping"
import { MarkdownComponents } from "~/components/markdown/library/types"

// Component

interface Props {
	children?: string
}

const components: MarkdownComponents = {
	strong: mappedHighlightMarkdownElement
}

const Markdown: FunctionComponent<Props> = props => {
	return (
		<ReactMarkdown components={components} skipHtml>
			{props.children ?? ""}
		</ReactMarkdown>
	)
}

export default Markdown
