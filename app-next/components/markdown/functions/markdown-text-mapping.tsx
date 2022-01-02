import { AnchorHTMLAttributes, FunctionComponent } from "react"
import { MarkdownComponentArgs } from "~/components/markdown/library/types"
import { splitChildren } from "~/components/typo/functions/typo-children-split"
import { TypoFragment } from "~/components/typo/typo-fragment"

type Args = MarkdownComponentArgs & AnchorHTMLAttributes<HTMLParagraphElement>

const MirrorWrapper: FunctionComponent<{ node: string; childProps: any }> = props => {
	switch (props.node) {
		case "p":
			return <p {...props.childProps}>{props.children}</p>
		case "h1":
			return <h3 {...props.childProps}>{props.children}</h3>
		case "h2":
			return <h4 {...props.childProps}>{props.children}</h4>
		case "h3":
			return <h3 {...props.childProps}>{props.children}</h3>
		case "h4":
			return <h4 {...props.childProps}>{props.children}</h4>
		case "h5":
			return <h5 {...props.childProps}>{props.children}</h5>
		default:
			console.error(`Could not re-wrap markdown element type '${props.node}'.`)
			return <></>
	}
}

export function mappedTextMarkdownElement({ node, inline, className, children, ...props }: Args) {
	const [leftChildren, lastChild] = splitChildren(children)

	const formattedLastChild = (() => {
		if (typeof lastChild !== "string") {
			return lastChild
		}

		return <TypoFragment text={lastChild} />
	})()

	return (
		<MirrorWrapper node={node.tagName} childProps={{ className, ...props }}>
			{leftChildren}
			{formattedLastChild}
		</MirrorWrapper>
	)
}
