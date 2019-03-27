import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import WorkOverviewPageData from "./work-overview-page-data"

export namespace WorkOverviewPageMapper {

	export async function updateWorkItems(data: WorkOverviewPageData) {
		try {
			const workItems = await CockpitDataProvider.workItems()
			data.workItems = workItems.sort((lhs, rhs) => {
				return lhs.meta.created > rhs.meta.created ? -1 : lhs.meta.created < rhs.meta.created ? 1 : 0
			})
		} catch (error) {
			console.error(`Could not fetch work items. ${error}`)
		}
	}

}