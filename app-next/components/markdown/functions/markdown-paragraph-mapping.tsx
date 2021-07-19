import { AnchorHTMLAttributes } from "react"
import { MarkdownComponentArgs } from "~/components/markdown/library/types"
import { splitChildren } from "~/components/typo/functions/typo-children-split"
import { TypoFragment } from "~/components/typo/typo-fragment"

type Args = MarkdownComponentArgs & AnchorHTMLAttributes<HTMLParagraphElement>

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
