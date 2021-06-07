import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum WorkContentImageAlignment {
	Default = "Default",
	RowsOnly = "Rows Only"
}

export const allWorkContentImageAlignment: WorkContentImageAlignment[] = [WorkContentImageAlignment.Default, WorkContentImageAlignment.RowsOnly]

export function workContentImageAlignmentFromRawValue(rawValue?: string): WorkContentImageAlignment | undefined {
	return enumCaseFromRawValue(rawValue, allWorkContentImageAlignment)
}
