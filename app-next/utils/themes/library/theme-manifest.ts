import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Dictionary } from "~/utils/types/library/dictionary"
import { UUID } from "~/utils/uuid/uuid"

export interface ThemeManifest {
	id: UUID
	name: string
	dateCreated: Date
	packages: Dictionary<ThemeFormat, ThemeManifestPackage>
}

export interface ThemeManifestPackage {
	format: ThemeFormat
	group: string
	resource: string
}
