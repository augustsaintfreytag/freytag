import { brandTitle } from "~/components/brand/brand-text"

const separatorCharacter = "—"

export function joinedPageTitle(...components: string[]): string {
	return components.join(` ${separatorCharacter} `)
}

export function pageTitle(sectionTitle: string): string {
	return joinedPageTitle(sectionTitle, brandTitle())
}
