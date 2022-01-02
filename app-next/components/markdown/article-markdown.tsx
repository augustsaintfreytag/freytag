import { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import { mappedAnchorMarkdownElement } from "~/components/markdown/functions/markdown-anchor-mapping"
import { mappedCodeMarkdownElement } from "~/components/markdown/functions/markdown-code-mapping"
import { mappedParagraphMarkdownElement } from "~/components/markdown/functions/markdown-paragraph-mapping"
import { MarkdownComponents } from "~/components/markdown/library/types"

// Component

interface Props {
	children?: string
}

const components: MarkdownComponents = {
	a: mappedAnchorMarkdownElement,
	p: mappedParagraphMarkdownElement,
	code: mappedCodeMarkdownElement,
	h1: "h3",
	h2: "h4"
}

const ArticleMarkdown: FunctionComponent<Props> = props => {
	return (
		<ReactMarkdown components={components} skipHtml>
			{props.children ?? ""}
		</ReactMarkdown>
	)
}

export default ArticleMarkdown
