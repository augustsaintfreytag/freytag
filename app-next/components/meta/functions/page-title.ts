import { brandTitle } from "~/components/meta/components/brand-text"

const separatorCharacter = "—"

function joinedPageTitle(...components: string[]): string {
	return components.join(` ${separatorCharacter} `)
}

export function pageTitle(...sectionTitles: string[]): string {
	return joinedPageTitle(...sectionTitles, brandTitle())
}
