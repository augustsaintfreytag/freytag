import { useState } from "react"
import { valueDescriptionBlockForColumn } from "~/components/life-table/functions/life-table-value-description"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableFilterKind as FilterKind, LifeTableFilterKindAll as FilterKindAll } from "~/components/life-table/library/life-table-filter-kind"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import { LifeTableItemData as ItemData } from "~/components/life-table/models/life-table-item-data"

// Filtering

function filteredDataFromCollection(data: ItemData[], kind: FilterKind): ItemData[] {
	if (kind === FilterKindAll) {
		return [...data]
	}

	return data.filter(item => {
		return item.kind === kind
	})
}

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

export type DataProps = {
	filterKind: FilterKind
	sortColumn: Column
	sortMode: SortMode
}

type SetDataPropsBlock = (props: DataProps) => void
type SetDataBlock = (data: ItemData[]) => void

type HookProps = {
	data: ItemData[]
	sortProps: DataProps
	setData: SetDataBlock
	setDataProps: SetDataPropsBlock
}

// Hook

export function useLifeTableData(initialData: ItemData[], initialDataProps: DataProps): HookProps {
	const [rawData, setRawData] = useState<ItemData[]>(initialData)
	const [displayableData, setDisplayableData] = useState<ItemData[]>(initialData)
	const [props, setProps] = useState<DataProps>(initialDataProps)

	function setDataProps(props: DataProps) {
		setProps(props)

		const filteredData = filteredDataFromCollection(rawData, props.filterKind)
		const sortedData = sortedDataFromCollection(filteredData, props.sortMode, props.sortColumn)

		setDisplayableData(sortedData)
	}

	function setData(data: ItemData[]) {
		setRawData(data)
		setDataProps(props)
	}

	return {
		data: displayableData,
		sortProps: props,
		setData: setData,
		setDataProps: setDataProps
	}
}
