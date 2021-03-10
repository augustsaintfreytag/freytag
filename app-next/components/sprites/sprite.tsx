import { FunctionComponent } from "react"

type Props = {
	className?: string
	href: string
}

const Sprite: FunctionComponent<Props> = props => (
	<svg className={props.className}>
		<use xlinkHref={props.href} />
	</svg>
)

export default Sprite
