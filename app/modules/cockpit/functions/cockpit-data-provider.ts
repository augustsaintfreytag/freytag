import { Dictionary } from "@/modules/common/library/dictionary"
import { UUID } from "@/modules/common/library/uuid"
import { CockpitDataAccess } from "cockpit-access"
import { Landing } from "../../storage/models/landing"
import { Vita } from "../../storage/models/vita-event"
import { Work } from "../../storage/models/work-item"

export namespace CockpitDataProvider {

	// Collections
	
	export async function lifeEvents(): Promise<Vita.Event[]> {
		const response = await CockpitDataAccess.recordsInCollection("vita", {
			filter: { display: true }
		})

		return response.entries.map(entry => {
			const storedLifeEvent = entry as Vita.EventEntry
			return new Vita.Event(storedLifeEvent)
		})
	}

	export async function workItems(): Promise<Work.Item[]> {
		const response = await CockpitDataAccess.recordsInCollection("work", {
			filter: { display: true }
		})

		return response.entries.map(entry => {
			const storedWorkItem = entry as Work.ItemEntry
			return new Work.Item(storedWorkItem)
		})
	}

	export async function workItemById(id: UUID): Promise<Work.Item|undefined> {
		return await workItemByFilter({ _id: id })
	}

	export async function workItemBySlug(slug: string): Promise<Work.Item|undefined> {
		return await workItemByFilter({ slug: slug })
	}

	export async function workItemByFilter(filter: Dictionary<any>): Promise<Work.Item|undefined> {
		const response = await CockpitDataAccess.recordsInCollection("work", {filter})

		if (response.entries.length !== 1) {
			return undefined
		}

		const storedWorkItem = response.entries[0] as Work.ItemEntry
		return new Work.Item(storedWorkItem)
	}

	// Singletons

	export async function landingGraphic(): Promise<Landing.Graphic|undefined> {
		const response = await CockpitDataAccess.singletonRecord("landing_graphic") as Landing.GraphicEntry

		if (!response.asset) {
			return undefined
		}

		return new Landing.Graphic(response)
	}

	export async function landingWorks(): Promise<Landing.Works|undefined> {
		const response = await CockpitDataAccess.singletonRecord("landing_works") as Landing.WorksEntry

		if (!response.items) {
			return undefined
		}

		return new Landing.Works(response)
	}

}