import { Vita } from "../../storage/models/vita-event"
import { CockpitDataAccess } from "./cockpit-data-access"
import { Work } from "../../storage/models/work-item"
import { UUID } from "~/components/common/library/uuid"

export default class CockpitDataProvider {

	static async lifeEvents(): Promise<Vita.Event[]> {
		const response = await CockpitDataAccess.recordsInCollection("vita")

		return response.entries.map(entry => {
			const storedLifeEvent = entry as Vita.EventEntry
			return new Vita.Event(storedLifeEvent)
		})
	}

	static async workItems(): Promise<Work.Item[]> {
		const response = await CockpitDataAccess.recordsInCollection("work")

		return response.entries.map(entry => {
			const storedWorkItem = entry as Work.ItemEntry
			return new Work.Item(storedWorkItem)
		})
	}

	static async workItemById(id: UUID): Promise<Work.Item|undefined> {
		const response = await CockpitDataAccess.recordsInCollection("work", {
			filter: { _id: id }
		})

		if (response.entries.length !== 1) {
			return undefined
		}

		const storedWorkItem = response.entries[0] as Work.ItemEntry
		return new Work.Item(storedWorkItem)
	}

}