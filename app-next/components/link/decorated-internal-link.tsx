import { FunctionComponent } from "react"
import InternalLink from "~/components/link/internal-link"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName, PropsWithHref } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./decorated-internal-link.module.sass"

interface Props extends PropsWithClassName, PropsWithHref {
	text: string
	compact?: boolean
}

const DecoratedInternalLink: FunctionComponent<Props> = props => (
	<InternalLink href={props.href} title={props.text}>
		<div className={className(styles.link, props.compact && styles.compact, props.className)}>
			<div className={styles.text}>{props.text}</div>
			<Sprite className={styles.symbol} href="#Arrow Top Right" />
		</div>
	</InternalLink>
)

export default DecoratedInternalLink
