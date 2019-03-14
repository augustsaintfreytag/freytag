import { Vita as Life } from "../models/vita-event"
import CockpitDataAccess from "./cockpit-data-access"

export default class CockpitDataProvider {

	static async lifeEvents(): Promise<Life.Event[]> {
		const response = await CockpitDataAccess.recordsInCollection("vita")
		return response.entries.map(entry => {
			const storedLifeEvent = entry as Life.EventEntry
			return new Life.Event(storedLifeEvent)
		})
	}

}