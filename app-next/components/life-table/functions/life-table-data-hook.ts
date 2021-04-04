import { useState } from "react"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import { LifeTableItemData as ItemData } from "~/components/life-table/models/life-table-item-data"
import { OpenDateInterval } from "~/utils/date/library/intervals"

// Sorting

function intervalComponentDescription(date: Date): string {
	return date.valueOf().toString()
}
function intervalDescription(interval?: OpenDateInterval): string {
	if (!interval?.start && interval?.end) {
		return intervalComponentDescription(interval.end)
	}

	if (interval?.start && interval?.end) {
		return `${intervalComponentDescription(interval.start)} – ${intervalComponentDescription(interval.end)}`
	}

	return ""
}

function valueDescriptionBlockForColumn(column: Column): (data: ItemData) => string {
	switch (column) {
		case Column.Context:
			return (data: ItemData) => data.context ?? ""
		case Column.Format:
			return (data: ItemData) => data.format
		case Column.Role:
			return (data: ItemData) => data.role ?? ""
		case Column.Span:
			return (data: ItemData) => intervalDescription(data.interval)
	}
}

function sortedDataFromCollection(data: ItemData[], mode: SortMode, column: Column): ItemData[] {
	const valueDescriptionBlock = valueDescriptionBlockForColumn(column)

	return data.sort((lhs, rhs) => {
		const lhsDescription = valueDescriptionBlock(lhs)
		const rhsDescription = valueDescriptionBlock(rhs)

		if (lhsDescription === rhsDescription) {
			return 0
		}

		return lhsDescription < rhsDescription ? 1 : -1
	})
}

// Library

type SortProps = {
	mode: SortMode
	column: Column
}

type SetSortPropsBlock = (props: SortProps) => void
type SetDataBlock = (data: ItemData[]) => void

type HookProps = {
	sortProps: SortProps
	setSortProps: SetSortPropsBlock
	data: ItemData[]
	setData: SetDataBlock
}

// Hook

export function useLifeTableData(initialData: ItemData[], props: SortProps): HookProps {
	const [sortProps, setSortProps] = useState<SortProps>(props)
	const [data, setSortedData] = useState<ItemData[]>([])

	const setData: SetDataBlock = (unsortedData: ItemData[]) => {
		const sortedData = sortedDataFromCollection(unsortedData, sortProps.mode, sortProps.column)
		setSortedData(sortedData)
	}

	setData(initialData)

	return {
		sortProps,
		setSortProps,
		data,
		setData
	}
}
