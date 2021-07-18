import { AnchorHTMLAttributes } from "react"
import { ReactNode } from "react-markdown"
import { MarkdownComponentArgs } from "~/components/markdown/library/types"
import TypoFragment from "~/components/typo/typo-fragment"

type Args = MarkdownComponentArgs & AnchorHTMLAttributes<HTMLParagraphElement>

function splitChildren(children: ReactNode[]): [ReactNode[], ReactNode | undefined] {
	const pivot = Math.max(0, children.length - 1)
	const leftChildren = children.slice(0, pivot)
	const lastChild = children[children.length - 1]

	return [leftChildren, lastChild]
}

export function mappedParagraphMarkdownElement({ node, inline, className, children, ...props }: Args) {
	const [leftChildren, lastChild] = splitChildren(children)

	const formattedLastChild = (() => {
		if (typeof lastChild !== "string") {
			return lastChild
		}

		return <TypoFragment text={lastChild} />
	})()

	return (
		<p className={className} {...props}>
			{leftChildren}
			{formattedLastChild}
		</p>
	)
}
