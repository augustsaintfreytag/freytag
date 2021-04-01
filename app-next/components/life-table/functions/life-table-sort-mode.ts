import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"

export function defaultSortModeForColumn(column: Column): SortMode {
	switch (column) {
		case Column.Span:
			return SortMode.Descending
		default:
			return SortMode.Ascending
	}
}

export function invertedSortMode(mode: SortMode): SortMode {
	return mode === SortMode.Descending ? SortMode.Ascending : SortMode.Descending
}
