import Link from "next/link"
import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithHref } from "~/types/props"

interface Props extends PropsWithHref, PropsWithAnyChildren {
	title?: string
}

const InternalLink: FunctionComponent<Props> = props => (
	<Link href={props.href}>
		<a title={props.title}>{props.children ?? props.href}</a>
	</Link>
)

export default InternalLink
