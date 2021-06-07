import { AnchorHTMLAttributes } from "react"
import { MarkdownComponentArgs } from "~/components/markdown/library/types"
import { URL } from "~/utils/routing/library/url"

type Args = MarkdownComponentArgs & AnchorHTMLAttributes<HTMLAnchorElement>

function isExternalLink(href: URL): boolean {
	return /https?:\/\//.test(href)
}

export function mappedAnchorMarkdownElement({ node, inline, className, children, ...props }: Args) {
	if (props.href && !isExternalLink(props.href)) {
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
