import { CockpitDataAccess } from "cockpit-access"
import { ApiCollection, defaultApiFilter } from "~/utils/api/common/functions/data-access"
import { LifeEvent } from "~/utils/api/records/life-event/library/life-event"

export async function lifeEventsFromApi(): Promise<LifeEvent[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Vita, { filter: defaultApiFilter })
	const entries = response.entries as LifeEvent[]

	return entries
}
