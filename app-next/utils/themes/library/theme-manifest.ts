import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Dictionary } from "~/utils/types/library/dictionary"
import { UUID } from "~/utils/uuid/uuid"

export class ThemeManifest {
	id: UUID
	name: string
	dateCreated: Date
	packages: Dictionary<ThemeFormat, ThemeManifestPackage>

	// Init

	constructor(id: UUID, name: string, dateCreated: Date, packages: Dictionary<ThemeFormat, ThemeManifestPackage>) {
		this.id = id
		this.name = name
		this.dateCreated = dateCreated
		this.packages = packages
	}

	// Coding

	static fromJSON(data: string): ThemeManifest | undefined {
		try {
			const codableObject = JSON.parse(data)
			return new ThemeManifest(codableObject.id, codableObject.name, new Date(codableObject.dateCreated), codableObject.packages)
		} catch (error) {
			console.error(`Could not decode theme manifest from JSON data '${data}'.`)
			return undefined
		}
	}

	toJSON(): string {
		const codableObject = {
			id: this.id,
			name: this.name,
			dateCreated: this.dateCreated.toISOString(),
			packages: this.packages
		}

		return JSON.stringify(codableObject, undefined, "\t")
	}
}

export interface ThemeManifestPackage {
	format: ThemeFormat
	group: string
	resource: string
}
