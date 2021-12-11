import { FunctionComponent } from "react"
import { Theme } from "~/api/records/themes/library/theme"
import ThemeMenuItem from "~/components/themes/theme-menu/components/theme-menu-item"
import { navigatorHasSharingSupport, shareTheme } from "~/components/themes/theme-menu/functions/theme-sharing"
import { ThemeMenuSprite } from "~/components/themes/theme-menu/library/theme-menu-sprite"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-menu.module.sass"

interface Props {
	themes: {
		current: Theme
		next?: Theme
		previous?: Theme
	}
}

function themeHref(theme?: Theme): URL | undefined {
	if (!theme) {
		return undefined
	}

	return `/themes/${theme._id}`
}

const ThemeMenu: FunctionComponent<Props> = props => {
	const theme = props.themes.current
	const [previousTheme, nextTheme] = [props.themes.previous, props.themes.next]

	return (
		<section className={styles.menu}>
			<ol>
				<ThemeMenuItem symbol={ThemeMenuSprite.Gallery} text="Return to Gallery" href="/themes" />
				<ThemeMenuItem
					symbol={ThemeMenuSprite.ShareTheme}
					text="Share Theme"
					onClick={() => shareTheme(theme)}
					disabled={!navigatorHasSharingSupport()}
				/>
				<ThemeMenuItem symbol={ThemeMenuSprite.CustomizeTheme} text="Customise Theme" disabled />
				<ThemeMenuItem symbol={ThemeMenuSprite.PreviousTheme} text="Previous Theme" href={themeHref(previousTheme)} disabled={!previousTheme} />
				<ThemeMenuItem symbol={ThemeMenuSprite.NextTheme} text="Next Theme" href={themeHref(nextTheme)} disabled={!nextTheme} />
			</ol>
		</section>
	)
}

export default ThemeMenu
