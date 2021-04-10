import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"

export const defaultSortMode = SortMode.Ascending

export function invertedSortMode(mode: SortMode): SortMode {
	return mode === SortMode.Ascending ? SortMode.Descending : SortMode.Ascending
}
