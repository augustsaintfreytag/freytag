import { useState } from "react"
import { defaultSortMode, invertedSortMode } from "~/components/life-table/functions/life-table-sort-mode"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"

interface Props {
	activeColumn: Column
	activeColumnSortMode: SortMode
	toggleColumn: (column: Column) => void
}

export function useLifeTableHeaderProps(initialColumn: Column, intialSortMode: SortMode): Props {
	const [activeColumn, setActiveColumn] = useState<Column>(initialColumn)
	const [activeColumnSortMode, setActiveColumnSortMode] = useState<SortMode>(intialSortMode)

	function toggleColumn(column: Column) {
		if (column === activeColumn) {
			const newSortMode = invertedSortMode(activeColumnSortMode)
			setActiveColumnSortMode(newSortMode)
			return
		}

		setActiveColumn(column)
		setActiveColumnSortMode(defaultSortMode)
	}

	return {
		activeColumn,
		activeColumnSortMode,
		toggleColumn
	}
}
