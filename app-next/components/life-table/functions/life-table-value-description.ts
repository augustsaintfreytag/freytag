import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableItemData as ItemData } from "~/components/life-table/models/life-table-item-data"
import { OpenDateInterval } from "~/utils/date/library/intervals"

function intervalComponentDescription(date: Date): string {
	return date.valueOf().toString()
}
export function intervalDescription(interval?: OpenDateInterval): string {
	if (!interval?.start && interval?.end) {
		return intervalComponentDescription(interval.end)
	}

	if (interval?.start && !interval?.end) {
		return intervalComponentDescription(interval.start)
	}

	if (interval?.start && interval?.end) {
		return `${intervalComponentDescription(interval.start)} – ${intervalComponentDescription(interval.end)}`
	}

	return ""
}

export function valueDescriptionBlockForColumn(column: Column): (data: ItemData) => string {
	switch (column) {
		case Column.Context:
			return (data: ItemData) => data.context ?? ""
		case Column.Format:
			return (data: ItemData) => data.format
		case Column.Role:
			return (data: ItemData) => data.role ?? ""
		case Column.Span:
			return (data: ItemData) => intervalDescription(data.interval)
		default:
			throw new Error(`Unknown column '${column}' for value description block form.`)
	}
}
