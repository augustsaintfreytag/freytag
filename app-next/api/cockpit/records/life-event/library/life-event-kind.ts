import { enumCaseFromRawValue } from "~/utils/types/functions/enum-case-conversion"

export enum LifeEventKind {
	Life = "Life",
	External = "External",
	Development = "Development",
	Photography = "Photography",
	Artwork = "Artwork",
	Film = "Film"
}

export const allLifeEventKinds: LifeEventKind[] = [
	LifeEventKind.Life,
	LifeEventKind.External,
	LifeEventKind.Development,
	LifeEventKind.Artwork,
	LifeEventKind.Photography,
	LifeEventKind.Film
]

export function lifeEventKindFromRawValue(rawValue: string): LifeEventKind | undefined {
	return enumCaseFromRawValue(rawValue, allLifeEventKinds)
}
