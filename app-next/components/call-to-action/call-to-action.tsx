import { FunctionComponent } from "react"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./call-to-action.module.sass"

interface Props extends PropsWithClassName {
	href: URL
	text: string
}

const CallToAction: FunctionComponent<Props> = props => (
	<a href={props.href}>
		<button className={className(props.className, styles.callToAction)}>
			<div className={styles.label}>{props.text}</div>
			<Sprite className={styles.symbol} href="#Arrow Down" />
		</button>
	</a>
)

export default CallToAction
