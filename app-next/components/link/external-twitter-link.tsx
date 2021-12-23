import { FunctionComponent } from "react"
import ExternalLink from "~/components/link/external-link"
import Sprite from "~/components/sprites/sprite"
import styles from "./external-twitter-link.module.sass"

interface Props {
	context: string
}

const ExternalTwitterLink: FunctionComponent<Props> = props => (
	<ExternalLink href="https://twitter.com/augustfreytag" name="Twitter Link" context={props.context}>
		<Sprite className={styles.symbol} href="#Twitter Symbol" /> Twitter
	</ExternalLink>
)

export default ExternalTwitterLink
