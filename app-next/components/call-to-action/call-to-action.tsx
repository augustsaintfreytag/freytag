import { FunctionComponent } from "react"
import { track } from "~/components/analytics/functions/track"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./call-to-action.module.sass"

interface Props extends PropsWithClassName {
	name: string
	href: URL
	text: string
}

const trackClick = (name: string, href: URL) => track(`Call to Action`, { name, href })

const CallToAction: FunctionComponent<Props> = props => (
	<a href={props.href} title={props.name} onClick={() => trackClick(props.name, props.href)}>
		<button className={className(props.className, styles.callToAction)}>
			<div className={styles.label}>{props.text}</div>
			<Sprite className={styles.symbol} href="#Arrow Down" />
		</button>
	</a>
)

export default CallToAction
