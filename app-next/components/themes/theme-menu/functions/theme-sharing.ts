import { Theme } from "~/api/cockpit/records/themes/library/theme"
import { track } from "~/components/analytics/functions/track"
import { appEnvironmentIsDevelopment } from "~/components/app/app"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { URL } from "~/utils/routing/library/url"

// Sharing

/** Open the navigator sharing dialog for the given theme.
 *
 *  This function may skew towards sharing a `url` or `text`.
 *  Example: "text: themeDescriptionForSharing(theme)".
 */
export async function shareTheme(theme: Theme) {
	const shareData: ShareData = {
		title: themeNameForSharing(theme),
		url: themeCanonicalRef(theme)
	}

	try {
		await window.navigator.share(shareData)
		track("Theme Share", { name: theme.name, href: shareData.url })
	} catch (error) {
		appEnvironmentIsDevelopment() && console.warn(`Could not share theme. ${error}`)
	}
}

export function navigatorHasSharingSupport(): boolean {
	if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
		return false
	}

	return true
}

// Sharing Data

function themeNameForSharing(theme: Theme): string {
	return `${theme.name} Theme`
}

function themeDescriptionForSharing(theme: Theme): string {
	const themeClosure = "Get this colour theme and discover many more on Theme Studio, a project by August Saint Freytag."
	return `${theme.description} ${themeClosure}`
}

function themeCanonicalRef(theme: Theme): URL {
	return canonicalHref(`/themes/${theme.slug ?? theme._id}`)
}
