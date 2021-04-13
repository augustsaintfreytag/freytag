import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum LifeEventKind {
	External = "External",
	Life = "Life",
	Film = "Film",
	Development = "Development",
	Graphics = "Graphics",
	Photography = "Photography"
}

export const allLifeEventKinds: LifeEventKind[] = [
	LifeEventKind.Life,
	LifeEventKind.External,
	LifeEventKind.Film,
	LifeEventKind.Development,
	LifeEventKind.Graphics,
	LifeEventKind.Photography
]

export function lifeEventKindFromRawValue(rawValue: string): LifeEventKind | undefined {
	return enumCaseFromRawValue(rawValue, allLifeEventKinds)
}
