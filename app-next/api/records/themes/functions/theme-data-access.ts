import { CockpitDataAccess } from "cockpit-access"
import { ApiCollection } from "~/api/common/functions/data-access"
import { Theme } from "~/api/records/themes/library/theme"

export async function themesFromApi(): Promise<Theme[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Themes, {})
	const entries = response.entries as Theme[]

	return entries
}
