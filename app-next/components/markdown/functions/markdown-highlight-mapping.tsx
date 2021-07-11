import { BaseHTMLAttributes } from "react"
import { MarkdownComponentArgs } from "~/components/markdown/library/types"

type Args = MarkdownComponentArgs & BaseHTMLAttributes<HTMLElement>

function isLastWordInCollection(index: number, words: string[]): boolean {
	return index === words.length - 1
}

export function mappedHighlightMarkdownElement({ node, inline, className, children, ...props }: Args) {
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
					<span key={`${props.key}-${index}-word`}>{word}</span>
					{!isLastWordInCollection(index, words) && <span key={`${props.key}-${index}-space`}>&nbsp;</span>}
				</>
			))}
		</strong>
	)
}
