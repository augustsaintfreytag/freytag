import { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import { mappedAnchorMarkdownElement } from "~/components/markdown/functions/markdown-anchor-mapping"
import { mappedParagraphMarkdownElement } from "~/components/markdown/functions/markdown-paragraph-mapping"
import { MarkdownComponents } from "~/components/markdown/library/types"

// Component

interface Props {
	children?: string
}

const components: MarkdownComponents = {
	a: mappedAnchorMarkdownElement,
	p: mappedParagraphMarkdownElement,
	h1: "h3",
	h2: "h4",
	h3: "h5",
	h4: "h6"
}

const ArticleMarkdown: FunctionComponent<Props> = props => {
	return (
		<ReactMarkdown components={components} skipHtml>
			{props.children ?? ""}
		</ReactMarkdown>
	)
}

export default ArticleMarkdown
