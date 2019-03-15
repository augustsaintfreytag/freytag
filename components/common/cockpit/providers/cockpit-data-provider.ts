import { Vita as Life } from "../models/vita-event"
import { CockpitDataAccess } from "./cockpit-data-access"
import { Work } from "../models/work-item"
import { UUID } from "../../library/uuid"

export default class CockpitDataProvider {

	static async lifeEvents(): Promise<Life.Event[]> {
		const response = await CockpitDataAccess.recordsInCollection("vita")

		return response.entries.map(entry => {
			const storedLifeEvent = entry as Life.EventEntry
			return new Life.Event(storedLifeEvent)
		})
	}

	static async workItems(): Promise<Work.Item[]> {
		const response = await CockpitDataAccess.recordsInCollection("work", {
			fields: { blocks: 0 }
		})

		return response.entries.map(entry => {
			const storedWorkItem = entry as Work.ItemEntry
			return new Work.Item(storedWorkItem)
		})
	}

	static async workItem(id: UUID): Promise<Work.Item|undefined> {
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