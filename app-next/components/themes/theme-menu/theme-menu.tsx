import { FunctionComponent } from "react"
import ThemeMenuItem, { ThemeMenuSprite } from "~/components/themes/theme-menu/components/theme-menu-item"
import styles from "./theme-menu.module.sass"

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
