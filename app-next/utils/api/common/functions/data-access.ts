import { CockpitDataAccess } from "cockpit-access"
import { LifeEvent } from "~/utils/api/records/life-event/library/life-event"

enum ApiCollection {
	Vita = "vita",
	Work = "work"
}

enum ApiSingleton {
	LandingGraphic = "landing_graphic",
	LandingWorks = "landing_works"
}

const defaultFilter = { display: true }

// Data

export async function lifeEvents(): Promise<LifeEvent[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Vita, { filter: defaultFilter })
	const entries = response.entries as LifeEvent[]

	return entries
}
