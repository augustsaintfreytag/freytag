import Link from "next/link"
import { FunctionComponent } from "react"
import { PropsWithAnyChildren, PropsWithClassName, PropsWithHref } from "~/types/props"

interface Props extends PropsWithClassName, PropsWithHref, PropsWithAnyChildren {
	title?: string
}

const InternalLink: FunctionComponent<Props> = props => (
	<Link href={props.href}>
		<a className={props.className} title={props.title}>
			{props.children ?? props.href}
		</a>
	</Link>
)

export default InternalLink
