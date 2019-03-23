import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import { WorkDetailPageData } from "./work-detail-page-data"

export namespace WorkDetailPageMapper {

	export async function updateWorkItem(data: WorkDetailPageData) {
		if (!data.workItemId) {
			return
		}

		try {
			const workItem = await CockpitDataProvider.workItemById(data.workItemId)
			data.workItem = workItem
		} catch (error) {
			console.error(`Could not fetch active work item.`, error)
		}
	}

}