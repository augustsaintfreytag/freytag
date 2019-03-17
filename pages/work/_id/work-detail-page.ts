import { Component, Vue } from "vue-property-decorator"
import { UUID } from "~/components/common/library/uuid"
import { Work } from "~/components/common/storage/models/work-item"
import CockpitDataProvider from "~/components/common/cockpit/providers/cockpit-data-provider"
import { DateFormatter } from "~/components/common/storage/providers/date-formatter"


interface WorkDetailPageData {

	workItemId: UUID|undefined
	workItem: Work.Item|undefined

}

const data: WorkDetailPageData = {

	workItemId: undefined,
	workItem: undefined

}

namespace WorkDetailPageMapper {

	export async function updateWorkItem(data: WorkDetailPageData) {
		if (!data.workItemId) {
			return
		}

		try {
			const workItem = await CockpitDataProvider.workItemById(data.workItemId)
			data.workItem = workItem
		} catch (error) {
			console.error(`Could not fetch active work item. ${error}`)
		}
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