import { FunctionComponent } from "react"
import InternalLink from "~/components/link/internal-link"
import Sprite from "~/components/sprites/sprite"
import { ThemeMenuSprite } from "~/components/themes/theme-menu/library/theme-menu-sprite"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-menu-item.module.sass"

interface Props {
	symbol: ThemeMenuSprite
	text: string
	href?: URL
	onClick?: () => void
}

const Inlay: FunctionComponent<Props> = props => (
	<div className={styles.inlay}>
		<Sprite className={styles.symbol} href={props.symbol} />
		<div className={styles.text}>{props.text}</div>
	</div>
)

const ThemeMenuItem: FunctionComponent<Props> = props => (
	<li className={styles.menuItem}>
		{props.href ? (
			<InternalLink href={props.href}>
				<Inlay {...props} />
			</InternalLink>
		) : (
			<a onClick={props.onClick}>
				<Inlay {...props} />
			</a>
		)}
	</li>
)

export default ThemeMenuItem
