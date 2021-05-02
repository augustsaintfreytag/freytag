import { ElementType, FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import { URL } from "~/utils/routing/library/url"

// Component

type Props = {
	children?: string
}

type Components = { [nodeType: string]: ElementType }

function isExternalLink(href: URL): boolean {
	return /https?:\/\//.test(href)
}

const components: Components = {
	a({ node, inline, className, children, ...props }) {
		if (!isExternalLink(props.href)) {
			return (
				<a className={className} {...props}>
					{children}
				</a>
			)
		}

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
