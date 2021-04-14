import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum LifeEventKind {
	External = "External",
	Life = "Life",
	Film = "Film",
	Development = "Development",
	Artwork = "Artwork",
	Photography = "Photography"
}

export const allLifeEventKinds: LifeEventKind[] = [
	LifeEventKind.Life,
	LifeEventKind.External,
	LifeEventKind.Film,
	LifeEventKind.Development,
	LifeEventKind.Artwork,
	LifeEventKind.Photography
]

export function lifeEventKindFromRawValue(rawValue: string): LifeEventKind | undefined {
	return enumCaseFromRawValue(rawValue, allLifeEventKinds)
}
