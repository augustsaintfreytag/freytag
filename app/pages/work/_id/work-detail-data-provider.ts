import { Work } from "@/components/common/storage/models/work-item"
import * as CockpitDataProvider from "@/utils/cockpit/functions/cockpit-data-provider"
import { UUID } from "@/utils/cockpit/functions/node_modules/@/library/uuid"

type WorkItemFetchIdentifier = string|UUID

export async function fetchWorkItem(identifier: WorkItemFetchIdentifier): Promise<Work.Item|undefined> {
	try {
		return (
			await CockpitDataProvider.workItemBySlug(identifier) || 
			await CockpitDataProvider.workItemById(identifier)
		)
	} catch (error) {
		console.error(`Could not fetch active work item.`, error)
	}
}