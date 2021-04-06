import { useState } from "react"
import { defaultSortModeForColumn, invertedSortMode } from "~/components/life-table/functions/life-table-sort-mode"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"

type Props = {
	activeColumn: Column
	activeColumnSortMode: SortMode
	onToggle: (column: Column) => void
}
export function useLifeTableHeaderProps(initialColumn: Column): Props {
	const [activeColumn, setActiveColumn] = useState<Column>(initialColumn)
	const [activeColumnSortMode, setActiveColumnSortMode] = useState<SortMode>(defaultSortModeForColumn(activeColumn))

	function onToggle(column: Column) {
		if (column === activeColumn) {
			const newSortMode = invertedSortMode(activeColumnSortMode)
			setActiveColumnSortMode(newSortMode)
			return
		}

		setActiveColumn(column)
		setActiveColumnSortMode(SortMode.Descending)
	}

	return {
		activeColumn,
		activeColumnSortMode,
		onToggle
	}
}
