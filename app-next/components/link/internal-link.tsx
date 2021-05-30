import Link from "next/link"
import { FunctionComponent } from "react"
import { PropsWithHref } from "~/types/props"

const InternalLink: FunctionComponent<PropsWithHref> = props => (
	<Link href={props.href}>
		<a>
			<u>{props.href}</u>
		</a>
	</Link>
)

export default InternalLink
