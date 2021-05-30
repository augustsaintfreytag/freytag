import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"

export type SpriteReference = string

type Props = PropsWithClassName & {
	href: SpriteReference
}

const Sprite: FunctionComponent<Props> = props => (
	<svg className={props.className}>
		<use xlinkHref={props.href} />
	</svg>
)

export default Sprite
