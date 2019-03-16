import CockpitDataProvider from "~/components/common/cockpit/providers/cockpit-data-provider"
import WorkOverviewPageData from "./work-overview-page-data"

export namespace WorkOverviewPageMapper {

	// Fetching

	export async function updateWorkItems(data: WorkOverviewPageData): Promise<void> {
		try {
			const workItems = await CockpitDataProvider.workItems()
			data.workItems = workItems
		} catch (error) {
			console.error(`Could not fetch work items. ${error}`)
		}
	}

	// Mapping

	export function sortWorkItems(data: WorkOverviewPageData) {
		// TODO: Implement sorting function once intended order is known.
	}

}