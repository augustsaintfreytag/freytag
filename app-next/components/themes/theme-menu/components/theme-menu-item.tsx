import Link from "next/link"
import { FunctionComponent } from "react"
import Sprite from "~/components/sprites/sprite"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-menu-item.module.sass"

export enum ThemeMenuSprite {
	PreviousTheme = "#Arrow Left Symbol",
	NextTheme = "#Arrow Right Symbol",
	ShareTheme = "#Share Symbol",
	CustomizeTheme = "#Edit Symbol",
	Gallery = "#Gallery Symbol"
}

interface Props {
	symbol: ThemeMenuSprite
	text: string
	href?: URL
}

const ThemeMenuItem: FunctionComponent<Props> = props => (
	<li className={styles.menuItem}>
		<Link href={props.href ?? "#"}>
			<a>
				<div className={styles.inlay}>
					<Sprite className={styles.symbol} href={props.symbol} />
					<div className={styles.text}>{props.text}</div>
				</div>
			</a>
		</Link>
	</li>
)

export default ThemeMenuItem
