import { formattedDateRange } from "@/components/life-event/functions/life-event-date-formatter"
import { LifeEventDetailRow } from "@/components/life-event/life-event-detail-table"
import { LifeEvent } from "@/utils/storage/models/life-event"

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

export function rowsFromEvent(lifeEvent: LifeEvent): LifeEventDetailRow[] {
	return [
		{name: "Title", value: lifeEvent.name},
		{name: "Span", value: formattedDateRange(lifeEvent)},
		{name: "Kind", value: lifeEvent.kind},
		{name: "Format", value: lifeEvent.format},
		{name: "Role", value: lifeEvent.role},
		{name: "Location", value: lifeEvent.location},
		{name: "Context", value: lifeEvent.context},
		{name: "Description", value: lifeEvent.description}
	]
}