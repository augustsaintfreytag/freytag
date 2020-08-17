import * as CockpitDataProvider from "@/utils/cockpit/functions/cockpit-data-provider"
import { head, suffixedTitleForHead } from "@/utils/head/head"
import { WorkItem } from "@/utils/storage/models/work-item"
import { Component, Vue } from "vue-property-decorator"

interface Data {
	workItems: WorkItem[]
}

// Data Form

async function fetchWorkItems(): Promise<WorkItem[]> {
	try {
		const workItems = await CockpitDataProvider.workItems()
		return workItems.sort((lhs, rhs) => {
			return lhs.meta.created > rhs.meta.created ? -1 : lhs.meta.created < rhs.meta.created ? 1 : 0
		})
	} catch (error) {
		console.error(`Could not fetch work items. ${error}`)
		return []
	}
}

// Component

@Component({
	async asyncData(): Promise<Data> {
		return {
			workItems: await fetchWorkItems()
		}
	},

	head() {
		return head({
			title: suffixedTitleForHead("Work"),
			meta: [
				{
					hid: "description", 
					name: "description", 
					content: "Collection of showcases for selected works, past and present. Detailed write-ups and behind-the-scenes explorations, visual excerpts and interview content."
				}
			]
		})
	}
})
export default class WorkOverviewPage extends Vue {

	workItems: WorkItem[] = []

}