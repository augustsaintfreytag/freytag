import { FunctionComponent, useState } from "react"
import { Theme } from "~/api/cockpit/records/themes/library/theme"
import MenuItem from "~/components/menu/components/menu-item"
import Menu from "~/components/menu/menu"
import { navigatorHasSharingSupport, shareTheme } from "~/components/themes/theme-menu/functions/theme-sharing"
import { ThemeMenuSprite } from "~/components/themes/theme-menu/library/theme-menu-sprite"
import { useAfterInitialRender } from "~/utils/render/initial-render-hook"
import { URL } from "~/utils/routing/library/url"

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
		<Menu>
			<MenuItem symbol={ThemeMenuSprite.Gallery} text={itemTexts.returnToGallery} href="/themes#gallery" />
			<MenuItem symbol={ThemeMenuSprite.ShareTheme} text={itemTexts.shareTheme} onClick={() => shareTheme(theme)} disabled={!allowsSharing} />
			<MenuItem symbol={ThemeMenuSprite.CustomizeTheme} text={itemTexts.customizeTheme} disabled />
			<MenuItem symbol={ThemeMenuSprite.PreviousTheme} text={itemTexts.previousTheme} href={themeHref(previousTheme)} disabled={!previousTheme} />
			<MenuItem symbol={ThemeMenuSprite.NextTheme} text={itemTexts.nextTheme} href={themeHref(nextTheme)} disabled={!nextTheme} />
		</Menu>
	)
}

export default ThemeMenu
