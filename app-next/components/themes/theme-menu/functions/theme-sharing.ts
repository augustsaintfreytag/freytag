import { Theme } from "~/api/records/themes/library/theme"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { URL } from "~/utils/routing/library/url"

// Sharing

export async function shareTheme(theme: Theme) {
	const shareData: ShareData = {
		title: themeNameForSharing(theme),
		text: themeDescriptionForSharing(theme),
		url: themeCanonicalRef(theme)
	}

	try {
		await window.navigator.share(shareData)
	} catch {}
}

export function navigatorHasSharingSupport(): boolean {
	if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
		return false
	}

	return true
}

// Sharing Data

function themeNameForSharing(theme: Theme): string {
	return `${theme.name} Theme (ASFTS)`
}

function themeDescriptionForSharing(theme: Theme): string {
	const themeClosure = "Get this colour theme and discover many more on Theme Studio, a project by August Saint Freytag."
	return `${theme.description} ${themeClosure}`
}

function themeCanonicalRef(theme: Theme): URL {
	return canonicalHref(`/themes/${theme._id}`)
}
