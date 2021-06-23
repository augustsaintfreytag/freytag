import { FunctionComponent, ReactNode, ReactNodeArray } from "react"
import { track } from "~/components/analytics/functions/track"
import { URL } from "~/utils/routing/library/url"

interface Props {
	href: URL
	children: ReactNode | ReactNodeArray
	name?: string
	context?: string
}

const trackClick = (name: string | undefined, context: string | undefined, href: URL) => track("External Link", { name, context, href })

const ExternalLink: FunctionComponent<Props> = props => (
	<a href={props.href} target="_blank" rel="noopener" onClick={() => trackClick(props.name, props.context, props.href)}>
		{props.children}
	</a>
)

export default ExternalLink
