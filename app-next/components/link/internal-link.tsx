import Link from "next/link"
import { FunctionComponent } from "react"
import { PropsWithHref } from "~/types/props"

const InternalLink: FunctionComponent<PropsWithHref> = props => (
	<Link href={props.href}>
		<a>{props.href}</a>
	</Link>
)

export default InternalLink
