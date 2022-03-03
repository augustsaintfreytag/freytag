import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"
import { UUID } from "~/utils/uuid/uuid"

// Functionality to access the self-exposed API at `/api/themes`

export async function generateThemeViaApi(properties: ThemeGenerationProperties): Promise<ThemeManifest> {
	const themeProperties = {
		id: properties.id,
		name: properties.name,
		description: properties.description,
		colors: properties.colors.map(color => color.hex)
	}

	const response = await fetch("/api/themes", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(themeProperties)
	})

	try {
		return (await response.json()) as ThemeManifest
	} catch (error) {
		throw new Error(`Could not decode generate theme response as valid manifest. ${String(error)}`)
	}
}

export async function themeManifestViaApi(id: UUID): Promise<ThemeManifest> {
	const response = await fetch(`/api/themes/${id}`)
	const manifest = (await response.json()) as ThemeManifest

	return manifest
}
