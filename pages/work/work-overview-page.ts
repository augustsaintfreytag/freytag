import { Component, Vue } from "vue-property-decorator"
import WorkOverviewPageData from "./work-overview-page-data"
import { WorkOverviewPageMapper } from "./work-overview-page-mapper"

const data: WorkOverviewPageData = {
	workItems: []
}

@Component({
	data() {
		return data
	},

	async asyncData() {
		await WorkOverviewPageMapper.updateWorkItems(data)
		return data
	}
})
export default class WorkOverviewPage extends Vue {

}