import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { colorsFromHexDescriptions } from "~/utils/colors/functions/color-conversion"
import { generateThemeCollection } from "~/utils/themes/functions/theme-generation"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { UUID } from "~/utils/uuid/uuid"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = req.body

	if (!isRequestBody(body)) {
		res.status(400).end("Invalid request body.")
		return
	}

	const properties: ThemeGenerationProperties = {
		id: body.id ?? randomUUID(),
		name: body.name,
		description: body.description,
		colors: colorsFromHexDescriptions(body.colors)
	}

	try {
		const manifest = await generateThemeCollection(properties)
		res.json(manifest.toJSON())
	} catch (error) {
		res.status(500).end(String(error))
	}
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
