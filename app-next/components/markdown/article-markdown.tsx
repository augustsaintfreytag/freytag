import { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import { mappedAnchorMarkdownElement } from "~/components/markdown/functions/markdown-anchor-mapping"
import { mappedCodeMarkdownElement } from "~/components/markdown/functions/markdown-code-mapping"
import { mappedTextMarkdownElement } from "~/components/markdown/functions/markdown-text-mapping"
import { MarkdownComponents } from "~/components/markdown/library/types"

// Component

interface Props {
	children?: string
}

const components: MarkdownComponents = {
	a: mappedAnchorMarkdownElement,
	p: mappedTextMarkdownElement,
	code: mappedCodeMarkdownElement,
	h1: mappedTextMarkdownElement,
	h2: mappedTextMarkdownElement,
	h3: mappedTextMarkdownElement,
	h4: mappedTextMarkdownElement,
	h5: mappedTextMarkdownElement
}

const ArticleMarkdown: FunctionComponent<Props> = props => {
	return (
		<ReactMarkdown components={components} skipHtml>
			{props.children ?? ""}
		</ReactMarkdown>
	)
}

export default ArticleMarkdown
