import { LifeEventDetailRow } from "@/components/life-event/life-event-detail-table"
import { Vita } from "@/utils/storage/models/vita-event"
import { DateFormatter } from "@/utils/storage/providers/date-formatter"

export function filteredRowsByNames(rows: LifeEventDetailRow[], rowNames: string[]): LifeEventDetailRow[] {
	return rows.filter(row => {
		return rowNames.includes(row.name)
	})
}

export function filteredRowsByValue(rows: LifeEventDetailRow[]): LifeEventDetailRow[] {
	return rows.filter(row => {
		return row.value !== undefined && row.value !== ""
	})
}

export function rowsFromEvent(lifeEvent: Vita.Event): LifeEventDetailRow[] {
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