import { UUID } from "~/api/common/library/uuid"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { lines } from "~/utils/description/functions/lines"
import { URL } from "~/utils/routing/library/url"

export function themeStudioName(): string {
	return "Themes"
}

export function themeStudioCanonicalHref(): URL {
	return canonicalHref("/themes")
}

export function themeCanonicalHref(id: UUID): URL {
	return canonicalHref(`/themes/${id}`)
}

export function themeStudioDescription(): string {
	return lines(
		"Varied colour themes in light and dark variants.",
		"Distinct palettes for different preferences, environments, and moods.",
		"Code previews and download packages available in popular editor formats."
	)
}

export function themeStudioIntroduction(): string {
	return lines(
		"Explore a varied collection of colour themes in light and dark variants.",
		"Find a distinct colour palette to match your preference, environment, and mood.",
		"Code previews and download packages available in popular editor formats."
	)
}
