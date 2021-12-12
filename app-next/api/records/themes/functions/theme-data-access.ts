import { CockpitDataAccess } from "cockpit-access"
import { ApiCollection, defaultApiFilter } from "~/api/common/functions/data-access"
import { Theme } from "~/api/records/themes/library/theme"

export async function themesFromApi(): Promise<Theme[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Themes, {})
	const entries = response.entries as Theme[]

	return entries
}

export async function themeFromApi(id: string): Promise<Theme | undefined> {
	const filter = { ...defaultApiFilter, _id: id }
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Themes, { filter })
	const entry = response.entries[0] as Theme | undefined

	return entry
}
