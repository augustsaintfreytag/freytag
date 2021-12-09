import Link from "next/link"
import { FunctionComponent } from "react"
import Sprite from "~/components/sprites/sprite"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-menu.module.sass"

enum ThemeMenuSprite {
	PreviousTheme = "#Arrow Left Symbol",
	NextTheme = "#Arrow Right Symbol",
	ShareTheme = "#Share Symbol",
	CustomizeTheme = "#Edit Symbol",
	Gallery = "#Gallery Symbol"
}

interface ThemeMenuItemProps {
	symbol: ThemeMenuSprite
	text: string
	href?: URL
}

const ThemeMenuItem: FunctionComponent<ThemeMenuItemProps> = props => (
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

const ThemeMenu: FunctionComponent = () => (
	<section className={styles.menu}>
		<ol>
			<ThemeMenuItem symbol={ThemeMenuSprite.Gallery} text="Return to Gallery" href="/themes" />
			<ThemeMenuItem symbol={ThemeMenuSprite.ShareTheme} text="Share Theme" />
			<ThemeMenuItem symbol={ThemeMenuSprite.CustomizeTheme} text="Customize Theme" />
			<ThemeMenuItem symbol={ThemeMenuSprite.PreviousTheme} text="Previous Theme" />
			<ThemeMenuItem symbol={ThemeMenuSprite.NextTheme} text="Next Theme" />
		</ol>
	</section>
)

export default ThemeMenu
