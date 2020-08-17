import * as CockpitDataProvider from "@/utils/cockpit/functions/cockpit-data-provider"
import { UUID } from "@/utils/common/library/uuid"
import { WorkItem } from "@/utils/storage/models/work-item"

type WorkItemFetchIdentifier = string|UUID

export async function fetchWorkItem(identifier: WorkItemFetchIdentifier): Promise<WorkItem|undefined> {
	try {
		return (
			await CockpitDataProvider.workItemBySlug(identifier) || 
			await CockpitDataProvider.workItemById(identifier)
		)
	} catch (error) {
		console.error(`Could not fetch active work item.`, error)
	}
}