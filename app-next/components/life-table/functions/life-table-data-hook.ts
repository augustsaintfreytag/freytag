import { useState } from "react"
import { valueDescriptionBlockForColumn } from "~/components/life-table/functions/life-table-value-description"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import { LifeTableItemData as ItemData } from "~/components/life-table/models/life-table-item-data"

// Sorting

function sortedDataFromCollection(data: ItemData[], mode: SortMode, column: Column): ItemData[] {
	const valueDescriptionBlock = valueDescriptionBlockForColumn(column)

	if (mode === SortMode.None) {
		return [...data]
	}

	const sortedData = data.sort((lhs, rhs) => {
		const lhsDescription = valueDescriptionBlock(lhs)
		const rhsDescription = valueDescriptionBlock(rhs)

		if (lhsDescription === rhsDescription) {
			return 0
		}

		return lhsDescription < rhsDescription ? -1 : 1
	})

	if (mode === SortMode.Descending) {
		return sortedData.reverse()
	}

	return sortedData
}

// Library

type SortProps = {
	mode: SortMode
	column: Column
}

type SetSortPropsBlock = (props: SortProps) => void
type SetDataBlock = (data: ItemData[]) => void

type HookProps = {
	data: ItemData[]
	sortProps: SortProps
	setSortProps: SetSortPropsBlock
}

// Hook

export function useLifeTableData(initialData: ItemData[], initialSortProps: SortProps): HookProps {
	const [sortProps, setSortPropsState] = useState<SortProps>(initialSortProps)
	const [data, setDataState] = useState<ItemData[]>(initialData)

	function setSortProps(props: SortProps) {
		setSortPropsState(props)

		const sortedData = sortedDataFromCollection(data, props.mode, props.column)
		setDataState(sortedData)
	}

	return {
		data,
		sortProps,
		setSortProps
	}
}
