import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum LifeTableSortMode {
	None = "-",
	Ascending = "↑",
	Descending = "↓"
}

export const allLifeTableSortMode: LifeTableSortMode[] = [LifeTableSortMode.None, LifeTableSortMode.Ascending, LifeTableSortMode.Descending]

export function lifeTableSortModeFromRawValue(rawValue: string): LifeTableSortMode | undefined {
	return enumCaseFromRawValue(rawValue, allLifeTableSortMode)
}
