import { ElementType, FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"

// Component

type Props = {
	children?: string
}

type Components = { [nodeType: string]: ElementType }

const components: Components = {
	a({ node, inline, className, children, ...props }) {
		return (
			<a className={className} {...props} target="_blank" rel="noopener">
				{children}
			</a>
		)
	}
}

const Markdown: FunctionComponent<Props> = props => {
	return (
		<ReactMarkdown components={components} skipHtml>
			{props.children ?? ""}
		</ReactMarkdown>
	)
}

export default Markdown
