import { Dictionary } from "@/utils/common/library/dictionary"
import { UUID } from "@/utils/common/library/uuid"
import { LandingGraphic, LandingGraphicEntry, LandingWorks, LandingWorksEntry } from "@/utils/storage/models/landing"
import { LifeEvent, LifeEventEntry } from "@/utils/storage/models/life-event"
import { WorkItem, WorkItemEntry } from "@/utils/storage/models/work-item"
import { CockpitDataAccess } from "cockpit-access"

// Collections

export async function lifeEvents(): Promise<LifeEvent[]> {
	const response = await CockpitDataAccess.recordsInCollection("vita", {
		filter: { display: true }
	})

	const entries = response.entries as LifeEventEntry[]
	return entries.map(entry => new LifeEvent(entry))
}

export async function workItems(): Promise<WorkItem[]> {
	const response = await CockpitDataAccess.recordsInCollection("work", {
		filter: { display: true }
	})

	return response.entries.map(entry => {
		const storedWorkItem = entry as WorkItemEntry
		return new WorkItem(storedWorkItem)
	})
}

export async function workItemById(id: UUID): Promise<WorkItem|undefined> {
	return await workItemByFilter({ _id: id })
}

export async function workItemBySlug(slug: string): Promise<WorkItem|undefined> {
	return await workItemByFilter({ slug: slug })
}

export async function workItemByFilter(filter: Dictionary<any>): Promise<WorkItem|undefined> {
	const response = await CockpitDataAccess.recordsInCollection("work", {filter})

	if (response.entries.length !== 1) {
		return undefined
	}

	const storedWorkItem = response.entries[0] as WorkItemEntry
	return new WorkItem(storedWorkItem)
}

// Singletons

export async function landingGraphic(): Promise<LandingGraphic|undefined> {
	const response = await CockpitDataAccess.singletonRecord("landing_graphic") as LandingGraphicEntry

	if (!response.asset) {
		return undefined
	}

	return new LandingGraphic(response)
}

export async function landingWorks(): Promise<LandingWorks|undefined> {
	const response = await CockpitDataAccess.singletonRecord("landing_works") as LandingWorksEntry

	if (!response.items) {
		return undefined
	}

	return new LandingWorks(response)
}