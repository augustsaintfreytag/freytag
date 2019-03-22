import { Component, Vue } from "vue-property-decorator"
import WorkOverviewPageData from "./work-overview-page-data"
import { WorkOverviewPageMapper } from "./work-overview-page-mapper"
import { Head } from "~/components/common/head/head";

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
	},

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Work")
		})
	}
})
export default class WorkOverviewPage extends Vue {

}