import { FunctionComponent, useState } from "react"
import { Theme } from "~/api/records/themes/library/theme"
import ThemeMenuItem from "~/components/themes/theme-menu/components/theme-menu-item"
import { navigatorHasSharingSupport, shareTheme } from "~/components/themes/theme-menu/functions/theme-sharing"
import { ThemeMenuSprite } from "~/components/themes/theme-menu/library/theme-menu-sprite"
import { useAfterInitialRender } from "~/utils/render/initial-render-hook"
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
	const [allowsSharing, setAllowsSharing] = useState(false)

	useAfterInitialRender(() => {
		setAllowsSharing(navigatorHasSharingSupport())
	})

	return (
		<section className={styles.menu}>
			<nav>
				<ThemeMenuItem symbol={ThemeMenuSprite.Gallery} text="Return to Gallery" href="/themes" />
				<ThemeMenuItem symbol={ThemeMenuSprite.ShareTheme} text="Share Theme" onClick={() => shareTheme(theme)} disabled={!allowsSharing} />
				<ThemeMenuItem symbol={ThemeMenuSprite.CustomizeTheme} text="Customise Theme" disabled />
				<ThemeMenuItem symbol={ThemeMenuSprite.PreviousTheme} text="Previous Theme" href={themeHref(previousTheme)} disabled={!previousTheme} />
				<ThemeMenuItem symbol={ThemeMenuSprite.NextTheme} text="Next Theme" href={themeHref(nextTheme)} disabled={!nextTheme} />
			</nav>
		</section>
	)
}

export default ThemeMenu
