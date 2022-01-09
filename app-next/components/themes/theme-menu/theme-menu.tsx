import { FunctionComponent, useState } from "react"
import { Theme } from "~/api/records/themes/library/theme"
import ThemeMenuItem from "~/components/themes/theme-menu/components/theme-menu-item"
import { navigatorHasSharingSupport, shareTheme } from "~/components/themes/theme-menu/functions/theme-sharing"
import { ThemeMenuSprite } from "~/components/themes/theme-menu/library/theme-menu-sprite"
import { useAfterInitialRender } from "~/utils/render/initial-render-hook"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-menu.module.sass"

const itemTexts = {
	returnToGallery: { short: "Gallery", full: "Return to Gallery" },
	shareTheme: { short: "Share", full: "Share Theme" },
	customizeTheme: { short: "Customise", full: "Customise Theme" },
	previousTheme: { short: "Previous", full: "Previous Theme" },
	nextTheme: { short: "Next", full: "Next Theme" }
}

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
				<ThemeMenuItem symbol={ThemeMenuSprite.Gallery} text={itemTexts.returnToGallery} href="/themes#gallery" />
				<ThemeMenuItem symbol={ThemeMenuSprite.ShareTheme} text={itemTexts.shareTheme} onClick={() => shareTheme(theme)} disabled={!allowsSharing} />
				<ThemeMenuItem symbol={ThemeMenuSprite.CustomizeTheme} text={itemTexts.customizeTheme} disabled />
				<ThemeMenuItem
					symbol={ThemeMenuSprite.PreviousTheme}
					text={itemTexts.previousTheme}
					href={themeHref(previousTheme)}
					disabled={!previousTheme}
				/>
				<ThemeMenuItem symbol={ThemeMenuSprite.NextTheme} text={itemTexts.nextTheme} href={themeHref(nextTheme)} disabled={!nextTheme} />
			</nav>
		</section>
	)
}

export default ThemeMenu
