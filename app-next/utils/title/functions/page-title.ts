import { brandTitle } from "~/components/brand/brand-text"

const separatorCharacter = "—"

export function pageTitle(sectionTitle: string): string {
	return `${sectionTitle} ${separatorCharacter} ${brandTitle()}`
}
