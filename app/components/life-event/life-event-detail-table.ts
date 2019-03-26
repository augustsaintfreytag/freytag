import { Component, Vue } from "vue-property-decorator"
import { Vita } from "../common/storage/models/vita-event"
import { DateFormatter } from "../common/storage/providers/date-formatter"

interface DetailRow {
	name: string
	value: string|undefined
}

namespace LifeEventDetailTable {

	export function filteredRowsByNames(rows: DetailRow[], rowNames: string[]): DetailRow[] {
		return rows.filter(row => {
			return rowNames.includes(row.name)
		})
	}

	export function filteredRowsByValue(rows: DetailRow[]): DetailRow[] {
		return rows.filter(row => {
			return row.value !== undefined && row.value !== ""
		})
	}

	export function rowsFromEvent(lifeEvent: Vita.Event): DetailRow[] {
		return [
			{name: "Title", value: lifeEvent.name},
			{name: "Span", value: DateFormatter.formattedDateRange(lifeEvent)},
			{name: "Kind", value: lifeEvent.kind},
			{name: "Format", value: lifeEvent.format},
			{name: "Role", value: lifeEvent.role},
			{name: "Location", value: lifeEvent.location},
			{name: "Context", value: lifeEvent.context},
			{name: "Description", value: lifeEvent.description}
		]
	}

}

@Component({
	props: ["lifeEvent", "rowNames", "showsEmptyRows"],

	computed: {
		detailRows() {
			const event = this.$props.lifeEvent
			const rowNames = this.$props.rowNames as string[]
			
			if (!event) {
				return []
			}
			
			let rows: DetailRow[] = LifeEventDetailTable.rowsFromEvent(event)
			
			if (!this.$props.showsEmptyRows) {
				rows = LifeEventDetailTable.filteredRowsByValue(rows)
			}
			
			if (rowNames) {
				rows = LifeEventDetailTable.filteredRowsByNames(rows, rowNames)
			}

			return rows
		}
	}
})
export default class LifeEventDetailTableComponent extends Vue {}