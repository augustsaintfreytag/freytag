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
	},

	strong({ node, inline, className, children, ...props }) {
		const textComponents: string[] = children.reduce((collection: string[], child: any) => {
			if (typeof child === "string") {
				collection.push(child)
			}

			return collection
		}, [])

		const textContent = textComponents.join()
		const words = textContent.split(" ")

		return (
			<strong className={className} {...props}>
				{words.map((word, index) => (
					<>
						<span>{word}</span>
						{index !== words.length - 1 && <span>&nbsp;</span>}
					</>
				))}
			</strong>
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
