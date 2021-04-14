import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum LifeTableColumn {
	Span = "Span",
	Format = "Format",
	Role = "Role",
	Context = "Context"
}

export const allLifeTableColumn: LifeTableColumn[] = [LifeTableColumn.Span, LifeTableColumn.Format, LifeTableColumn.Role, LifeTableColumn.Context]

export function lifeTableColumnFromRawValue(rawValue: string): LifeTableColumn | undefined {
	return enumCaseFromRawValue(rawValue, allLifeTableColumn)
}
