import { Vita } from "../../storage/models/vita-event"
import { CockpitDataAccess } from "./cockpit-data-access"
import { Work } from "../../storage/models/work-item"
import { UUID } from "~/components/common/library/uuid"

export namespace CockpitDataProvider {

	// Collections
	
	export async function lifeEvents(): Promise<Vita.Event[]> {
		const response = await CockpitDataAccess.recordsInCollection("vita")

		return response.entries.map(entry => {
			const storedLifeEvent = entry as Vita.EventEntry
			return new Vita.Event(storedLifeEvent)
		})
	}

	export async function workItems(): Promise<Work.Item[]> {
		const response = await CockpitDataAccess.recordsInCollection("work")

		return response.entries.map(entry => {
			const storedWorkItem = entry as Work.ItemEntry
			return new Work.Item(storedWorkItem)
		})
	}

	export async function workItemById(id: UUID): Promise<Work.Item|undefined> {
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