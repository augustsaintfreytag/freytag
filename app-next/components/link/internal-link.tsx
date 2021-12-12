import Link from "next/link"
import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithHref } from "~/types/props"

interface Props extends PropsWithHref, PropsWithAnyChildren {}

const InternalLink: FunctionComponent<Props> = props => (
	<Link href={props.href}>
		<a>{props.children ?? props.href}</a>
	</Link>
)

export default InternalLink
