import { performanceMeasureDuration, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"
import { UUID } from "~/utils/uuid/uuid"

enum PerformanceKey {
	ReadThemeManifest = "read-theme-manifest-via-api",
	GenerateThemes = "generate-themes-via-api"
}

// Functionality to access the self-exposed API at `/api/themes`

export async function generateThemeViaApi(properties: ThemeGenerationProperties): Promise<ThemeManifest> {
	const themeProperties = {
		id: properties.id,
		name: properties.name,
		description: properties.description,
		colors: properties.colors.map(color => color.hex)
	}

	startPerformanceMeasure(PerformanceKey.GenerateThemes)

	const response = await fetch("/api/themes", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(themeProperties)
	})

	stopPerformanceMeasure(PerformanceKey.GenerateThemes)

	console.log(`Generated themes via API in ${performanceMeasureDuration(PerformanceKey.GenerateThemes)}.`)
	const manifest = ThemeManifest.fromJSON(await response.text())

	if (!manifest) {
		throw new Error(`Could not decode generate theme response as valid manifest.`)
	}

	return manifest
}

export async function themeManifestViaApi(id: UUID): Promise<ThemeManifest> {
	const response = await fetch(`/api/themes/${id}`)
	const manifest = ThemeManifest.fromJSON(await response.text())

	if (!manifest) {
		throw new Error(`Could not decode theme manifest response as valid manifest.`)
	}

	return manifest
}
