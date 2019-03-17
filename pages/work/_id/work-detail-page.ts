import { Component, Vue } from "vue-property-decorator"
import { DateFormatter } from "~/components/common/storage/providers/date-formatter"
import { WorkDetailPageData } from "./work-detail-page-data"
import { WorkDetailPageMapper } from "./work-detail-page-mapper"
import { Content } from "~/components/common/storage/models/content-block"


const data: WorkDetailPageData = {

		}


}

@Component({

	async asyncData({params}) {
		data.workItemId = params["id"]
		await WorkDetailPageMapper.updateWorkItem(data)

		if (!data.workItem) {
			if (data.workItemId) {
				throw { statusCode: 404, message: `Work with id '${data.workItemId}' could not be found.`}
			} else {
				throw { statusCode: 404, message: `Missing work id.` }
			}
		}

		return data
	},

	data() {
		return data
	},

	computed: {
		detailsRows() {
			const workItem = this.$data.workItem
			const event = workItem ? workItem.event : undefined
	
			if (!workItem || !event) {
				return []
			}
	
			return [
				{name: "Title", value: event.name},
				{name: "Span", value: DateFormatter.formattedDateRange(event)},
				{name: "Kind", value: event.kind},
				{name: "Format", value: event.format},
				{name: "Role", value: event.role}
			]
		}
	}

})
export default class WorkDetailPage extends Vue {}