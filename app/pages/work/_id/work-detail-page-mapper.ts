import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import { WorkDetailPageData } from "./work-detail-page-data"
import { Work } from "~/components/common/storage/models/work-item"

export namespace WorkDetailPageMapper {

	export async function updateWorkItem(data: WorkDetailPageData) {
		if (!data.workItemId) {
			return
		}

		try {
			let workItem: Work.Item|undefined

			// Fetch by Slug
			workItem = await CockpitDataProvider.workItemBySlug(data.workItemId)

			// Fetch by Id
			if (!workItem) {
				workItem = await CockpitDataProvider.workItemById(data.workItemId)
			}

			data.workItem = workItem
		} catch (error) {
			console.error(`Could not fetch active work item.`, error)
		}
	}

}