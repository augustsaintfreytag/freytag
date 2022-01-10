import { CockpitDataAccess } from "cockpit-access"
import { ApiCollection, defaultApiFilter } from "~/api/common/functions/data-access"
import { Theme } from "~/api/records/themes/library/theme"
import { Dictionary } from "~/utils/types/library/dictionary"

export async function themesFromApi(): Promise<Theme[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Themes, {})
	const entries = response.entries as Theme[]

	return entries
}

export async function themeFromApi(id: string): Promise<Theme | undefined> {
	const filterBySlug = { ...defaultApiFilter, slug: id }
	const themeBySlug = await themeFromApiWithFilters(filterBySlug)

	if (themeBySlug) {
		return themeBySlug
	}

	const filterById = { ...defaultApiFilter, _id: id }
	const themeById = themeFromApiWithFilters(filterById)

	return themeById
}

async function themeFromApiWithFilters(filter: Dictionary<any, any>): Promise<Theme | undefined> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Themes, { filter })

	if (response.entries.length > 0) {
		return response.entries[0] as Theme
	}

	return undefined
}
