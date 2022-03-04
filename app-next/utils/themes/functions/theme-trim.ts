import { rm } from "fs/promises"
import { TimeIntervalValue } from "~/utils/date/library/intervals"
import { themesOutputPath } from "~/utils/themes/functions/theme-configuration"
import { readThemeManifestCache } from "~/utils/themes/functions/theme-manifest"
import { UUID } from "~/utils/uuid/uuid"

const themeCollectionLifetime = TimeIntervalValue.Hour * 12

export async function trimThemeCollections() {
	const basePath = themesOutputPath()
	const expiredThemeIds = await expiredThemeCollections()
	const themePaths = Array.from(expiredThemeIds).map(id => `${basePath}/${id}`)

	try {
		await Promise.all(themePaths.map(path => rm(path, { recursive: true, force: true })))
	} catch (error) {
		console.error(`Could not remove expired theme collections for ids '${expiredThemeIds}' in trim operation. ${String(error)}`)
	}

	console.log(`Removed ${expiredThemeIds.size} expired theme collections in trim operation.`)
}

async function expiredThemeCollections(): Promise<Set<UUID>> {
	const themeManifestCache = await readThemeManifestCache()
	const expiredThemeIds = new Set<UUID>()

	const now = new Date()

	for (const themeId in themeManifestCache) {
		const manifest = themeManifestCache[themeId]!
		const expirationDate = new Date(manifest.dateCreated.getTime() + themeCollectionLifetime)

		if (now.getTime() >= expirationDate.getTime()) {
			expiredThemeIds.add(themeId)
		}
	}

	return expiredThemeIds
}
