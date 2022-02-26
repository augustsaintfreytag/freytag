import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { executeLocalCommand } from "~/utils/commands/functions/command-execution"
import { URL } from "~/utils/routing/library/url"
import { themesOutputPath } from "~/utils/themes/library/theme-config"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"
import { Dictionary } from "~/utils/types/library/dictionary"
import { UUID } from "~/utils/uuid/uuid"

// Global Cache

const cachedThemeManifests: Dictionary<UUID, ThemeManifest> = {}

// Cache Access

export function cachedThemeManifest(id: UUID): ThemeManifest | undefined {
	return cachedThemeManifests[id]
}

export function cacheThemeManifest(manifest: ThemeManifest) {
	cachedThemeManifests[manifest.id] = manifest
}

export function cachedThemeResourcePath(id: UUID, format: ThemeFormat): URL | undefined {
	const manifest = cachedThemeManifest(id)
	const formatPackage = manifest?.packages[format]

	if (!formatPackage) {
		return undefined
	}

	const { group, resource } = formatPackage
	return `${themesOutputPath}/${group}/${resource}`
}

// Cache Population

export async function createThemeManifestCache() {
	const output = await executeLocalCommand(`ls themesOutputPath`)
	const themeIds = output.split("\n")

	for (const themeId of themeIds) {
		const themeManifest = await readManifestFile(themeId)

		if (themeManifest === undefined) {
			continue
		}

		cachedThemeManifests[themeId] = themeManifest
	}
}

async function readManifestFile(id: UUID): Promise<ThemeManifest | undefined> {
	const output = await executeLocalCommand(`cat themesOutputPath/${id}/manifest.json`)
	return ThemeManifest.fromJSON(output)
}
