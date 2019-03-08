import { Vita } from "../models/vita-event"
import CockpitDataAccess from "./cockpit-data-access"

export default class CockpitDataProvider {

	static async vitaEvents(): Promise<Vita.Event[]> {
		const response = await CockpitDataAccess.recordsInCollection("vita")
		return response.entries.map(entry => {
			const storedVitaEvent = entry as Vita.EventEntry
			return new Vita.Event(storedVitaEvent)
		})
	}

}