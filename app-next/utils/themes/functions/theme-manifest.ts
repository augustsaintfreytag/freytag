import { readdir, readFile } from "fs/promises"
import { ThemeFormat, themeFormatIdentifierForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { hashValue } from "~/utils/hash/hash"
import { themesOutputPath } from "~/utils/themes/functions/theme-configuration"
import { depositedThemeFileName } from "~/utils/themes/functions/theme-resources"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifest, ThemeManifestPackage } from "~/utils/themes/library/theme-manifest"
import { Dictionary } from "~/utils/types/library/dictionary"
import { UUID } from "~/utils/uuid/uuid"

// Generation

export function generateManifest(properties: ThemeGenerationProperties, formats: ThemeFormat[]): ThemeManifest {
	if (!properties.id) {
		throw new TypeError(`Generating theme manifest requires an id in generation properties, none supplied.`)
	}

	const hash = generateThemeContentHash(properties)
	const packages: Dictionary<ThemeFormat, ThemeManifestPackage> = {}

	for (const format of formats) {
		packages[format] = {
			format: format,
			group: themeFormatIdentifierForFormat(format),
			resource: depositedThemeFileName(properties.name, format)
		}
	}

	return new ThemeManifest(properties.id, properties.name, hash, new Date(), packages)
}

function generateThemeContentHash(properties: ThemeGenerationProperties): string {
	return hashValue(
		JSON.stringify({
			name: properties.name,
			description: properties.description,
			colors: properties.colors
		})
	)
}

// Read

export async function readThemeManifestFile(id: UUID): Promise<ThemeManifest | undefined> {
	try {
		const path = `${themesOutputPath()}/${id}/manifest.json`
		const contents = await readFile(path, "utf8")

		return ThemeManifest.fromJSON(contents)
	} catch (error) {
		console.warn(`Could not read theme manifest for id '${id}' from output path at '${themesOutputPath()}'.`)
		return undefined
	}
}

export async function readThemeManifestCache(): Promise<Dictionary<UUID, ThemeManifest>> {
	const cache: Dictionary<UUID, ThemeManifest> = {}
	const directoryNames = await readdir(themesOutputPath())

	for (const directoryName of directoryNames) {
		const themeManifest = await readThemeManifestFile(directoryName)

		if (!themeManifest) {
			console.warn(`Could not read theme manifest for id '${directoryName}'.`)
			continue
		}

		cache[directoryName] = themeManifest
	}

	return cache
}
