import { CockpitDataAccess } from "cockpit-access"
import { CockpitCollection, defaultApiFilter } from "~/api/cockpit/data/library/data-access"
import { LifeEvent } from "~/api/cockpit/records/life-event/library/life-event"

export async function lifeEventsFromApi(): Promise<LifeEvent[]> {
	const response = await CockpitDataAccess.recordsInCollection(CockpitCollection.Life, { filter: defaultApiFilter })
	const entries = response.entries as LifeEvent[]

	return entries
}
