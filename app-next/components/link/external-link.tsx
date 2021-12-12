import { FunctionComponent } from "react"
import { track } from "~/components/analytics/functions/track"
import { PropsWithAnyChildren, PropsWithClassName } from "~/types/props"
import { URL } from "~/utils/routing/library/url"

interface Props extends PropsWithClassName, PropsWithAnyChildren {
	href: URL
	name?: string
	context?: string
}

const trackClick = (name: string, context: string | undefined, href: URL) => track("External Link", { name, context, href })

const ExternalLink: FunctionComponent<Props> = props => (
	<a
		className={props.className}
		href={props.href}
		target="_blank"
		rel="noopener"
		title={props.name}
		onClick={() => props.name && trackClick(props.name, props.context, props.href)}
	>
		{props.children ?? props.href}
	</a>
)

export default ExternalLink
