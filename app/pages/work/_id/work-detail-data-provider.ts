import { Work } from "~/components/common/storage/models/work-item"
import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import { UUID } from "~/components/common/library/uuid"

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