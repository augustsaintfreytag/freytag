import type { NextApiRequest, NextApiResponse } from "next"
import { clearThemeCollections, trimThemeCollections } from "~/utils/themes/functions/theme-cache"
import { readThemeManifestCache } from "~/utils/themes/functions/theme-manifest"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			await executeGet(req, res)
			return
		case "POST":
			await executePost(req, res)
			return
		case "DELETE":
			await executeDelete(req, res)
			return
	}
}

async function executeGet(req: NextApiRequest, res: NextApiResponse) {
	const cache = await readThemeManifestCache()
	const manifests = Object.values(cache) as ThemeManifest[]

	manifests.forEach(entry => {
		entry.id = entry.id.substring(0, 8) + "…"
	})

	const codableManifests = manifests.map(manifest => manifest.toObject())
	res.json({ status: "ok", manifests: codableManifests })
}

async function executePost(req: NextApiRequest, res: NextApiResponse) {
	const results = await trimThemeCollections()
	res.status(200).json({ status: "ok", ...results })
}

async function executeDelete(req: NextApiRequest, res: NextApiResponse) {
	const results = await clearThemeCollections()
	res.status(200).json({ status: "ok", ...results })
}
