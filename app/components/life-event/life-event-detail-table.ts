import { Component, Vue } from "vue-property-decorator"
import { Vita } from "../common/storage/models/vita-event"
import { DateFormatter } from "../common/storage/providers/date-formatter"

interface DetailRowDefinition {
	name: string
	value: string|undefined
}

function detailRows(lifeEvent: Vita.Event): DetailRowDefinition[] {
	return [
		{name: "Title", value: lifeEvent.name},
		{name: "Span", value: DateFormatter.formattedDateRange(lifeEvent)},
		{name: "Kind", value: lifeEvent.kind},
		{name: "Format", value: lifeEvent.format},
		{name: "Role", value: lifeEvent.role},
		{name: "Context", value: lifeEvent.context},
		{name: "Description", value: lifeEvent.description}
	]
}

@Component({
	props: ["lifeEvent", "rowNames"],

	computed: {
		detailRows() {
			const event = this.$props.lifeEvent
			const rowNames = this.$props.rowNames as string[]
			const rows: DetailRowDefinition[] = []
			
			if (!event) {
				return rows
			}

			if (!rowNames) {
				return detailRows(event)
			}

			for (const row of detailRows(event)) {
				if (!rowNames.includes(row.name)) {
					continue
				}

				rows.push(row)
			}

			return rows
		}
	}
})
export default class LifeEventDetailTableComponent extends Vue {}