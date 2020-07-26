import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/head/head"
import { Work } from "~/components/common/storage/models/work-item"
import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"

interface Data {
	workItems: Work.Item[]
}

// Data Form

async function fetchWorkItems(): Promise<Work.Item[]> {
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
		return Head.modeled({
			title: Head.Form.suffixedTitle("Work"),
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

	workItems: Work.Item[] = []

}