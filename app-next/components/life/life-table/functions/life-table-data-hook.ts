import { useState } from "react"
import { valueDescriptionBlockForColumn } from "~/components/life/life-table/functions/life-table-value-description"
import { LifeTableColumn as Column } from "~/components/life/life-table/library/life-table-column"
import {
	LifeTableFilterKind as FilterKind,
	LifeTableFilterKindAll as FilterKindAll
} from "~/components/life/life-table/library/life-table-filter-kind"
import { LifeTableSortMode as SortMode } from "~/components/life/life-table/library/life-table-sort-mode"
import { LifeTableItemData as ItemData } from "~/components/life/life-table/models/life-table-item-data"

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

	const preprocessedDataFragments = data.map(itemData => {
		return { data: itemData, description: valueDescriptionBlock(itemData) }
	})

	const sortedData = preprocessedDataFragments.sort((lhs, rhs) => {
		if (lhs.description === rhs.description) {
			return 0
		}

		return lhs.description < rhs.description ? -1 : 1
	})

	if (mode === SortMode.Descending) {
		sortedData.reverse()
	}

	return sortedData.map(fragment => fragment.data)
}

// Library

interface DataProps {
	filterKind: FilterKind
	sortColumn: Column
	sortMode: SortMode
}

type SetDataPropsBlock = (props: DataProps) => void
type SetDataBlock = (data: ItemData[]) => void

interface HookProps {
	data: ItemData[]
	sortProps: DataProps
	setData: SetDataBlock
	setDataProps: SetDataPropsBlock
}

// Hook

export type LifeTableDataProps = DataProps

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
