import type { NextApiRequest, NextApiResponse } from "next"
import { readThemeManifestCache } from "~/utils/themes/functions/theme-manifest"
import { clearThemeCollections, trimThemeCollections } from "~/utils/themes/functions/theme-trim"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			const cache = await readThemeManifestCache()
			const manifests = Object.values(cache) as ThemeManifest[]

			manifests.forEach(entry => {
				entry.id = entry.id.substring(0, 8) + "…"
			})

			res.json(manifests.map(manifest => manifest.toObject()))
			return
		case "POST":
			await trimThemeCollections()
			res.status(200).end()
			return
		case "DELETE":
			await clearThemeCollections()
			res.status(200).end()
	}
}
