import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"

type Props = PropsWithClassName & {
	href: string
}

const Sprite: FunctionComponent<Props> = props => (
	<svg className={props.className}>
		<use xlinkHref={props.href} />
	</svg>
)

export default Sprite
