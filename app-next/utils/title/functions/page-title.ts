import { brandTitleText } from "~/utils/brand/functions/brand-text"

const separatorCharacter = "—"

export function pageTitle(sectionTitle: string): string {
	return `${sectionTitle} ${separatorCharacter} ${brandTitleText}`
}
