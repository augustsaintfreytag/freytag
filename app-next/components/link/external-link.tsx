import { FunctionComponent, ReactNode, ReactNodeArray } from "react"
import { URL } from "~/utils/routing/library/url"

type Props = {
	href: URL
	children: ReactNode | ReactNodeArray
}

const ExternalLink: FunctionComponent<Props> = props => (
	<a href={props.href} target="_blank" rel="noopener">
		{props.children}
	</a>
)

export default ExternalLink
