import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { colorsFromHexDescriptions } from "~/utils/colors/functions/color-conversion"
import { TimeIntervalValue } from "~/utils/date/library/intervals"
import { performanceMeasureDuration, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { registerRoutineIfNotExists } from "~/utils/routine/routine"
import { generateThemeCollection } from "~/utils/themes/functions/theme-generation"
import { readThemeManifestFile } from "~/utils/themes/functions/theme-manifest"
import { trimThemeCollections } from "~/utils/themes/functions/theme-trim"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { UUID } from "~/utils/uuid/uuid"

enum PerformanceKey {
	ReadManifest = "read-manifest",
	GenerateThemes = "generate-themes"
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			await getThemeManifest(req, res)
			return
		case "PUT":
			await generateThemes(req, res)
			return
		default:
			res.status(405).end(`Method ${req.method} not supported.`)
	}
}

async function getThemeManifest(req: NextApiRequest, res: NextApiResponse) {
	const themeId = String(req.query["theme"])

	if (!themeId) {
		res.status(400).end(`Missing theme identifier.`)
		return
	}

	const manifest = await readThemeManifestFile(themeId)

	if (!manifest) {
		res.status(404).end("Theme manifest not cached or found.")
		return
	}

	res.json(manifest.toJSON())
}

async function generateThemes(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body

	if (!isRequestBody(body)) {
		res.status(400).end("Invalid request body.")
		return
	}

	const properties: ThemeGenerationProperties = {
		id: body.id ?? randomUUID().toLowerCase(),
		name: body.name,
		description: body.description,
		colors: colorsFromHexDescriptions(body.colors)
	}

	try {
		startPerformanceMeasure(PerformanceKey.GenerateThemes)
		const manifest = await generateThemeCollection(properties)
		stopPerformanceMeasure(PerformanceKey.GenerateThemes)
		res.json(manifest.toJSON())

		console.log(
			`Generated theme and manifest for '${manifest.id}' ('${manifest.name}') in ${performanceMeasureDuration(PerformanceKey.GenerateThemes)}.`
		)
	} catch (error) {
		console.error(error)
		res.status(500).end(String(error))
	}

	registerRoutineIfNotExists("trim-themes", TimeIntervalValue.Hour, trimThemeCollections)
}

// Library

interface RequestBody {
	id?: UUID
	name: string
	description: string
	colors: string[]
}

function isRequestBody(value: any): value is RequestBody {
	return typeof value === "object" && typeof value.name === "string" && typeof value.description === "string" && typeof value.colors === "object"
}
