import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Dictionary } from "~/utils/types/library/dictionary"
import { UUID } from "~/utils/uuid/uuid"

export class ThemeManifest {
	id: UUID
	name: string
	hash: string
	dateCreated: Date
	packages: Dictionary<ThemeFormat, ThemeManifestPackage>

	// Init

	constructor(id: UUID, name: string, hash: string, dateCreated: Date, packages: Dictionary<ThemeFormat, ThemeManifestPackage>) {
		this.id = id
		this.name = name
		this.hash = hash
		this.dateCreated = dateCreated
		this.packages = packages
	}

	// Coding

	static fromJSON(data: string): ThemeManifest | undefined {
		try {
			const codableObject = JSON.parse(data)
			return new ThemeManifest(codableObject.id, codableObject.name, codableObject.hash, new Date(codableObject.dateCreated), codableObject.packages)
		} catch (error) {
			console.error(`Could not decode theme manifest from JSON data '${data}'.`)
			return undefined
		}
	}

	toJSON(): string {
		return JSON.stringify(this.toObject(), undefined, "\t")
	}

	toObject(): object {
		return {
			id: this.id,
			name: this.name,
			hash: this.hash,
			dateCreated: this.dateCreated.toISOString(),
			packages: this.packages
		}
	}
}

export interface ThemeManifestPackage {
	format: ThemeFormat
	group: string
	resource: string
}
