export enum Kind {
	Life = "Life",
	Education = "Education", 
	External = "External", 
	Film = "Film", 
	Artwork = "Artwork", 
	Photography = "Photography", 
	Development = "Development"
}

export const kindRawValues: string[] = [
	"Life",
	"Education", 
	"External", 
	"Film", 
	"Artwork", 
	"Photography", 
	"Development"
]

export function eventKindFromRawValue(value: string): Kind|undefined {
	if (!kindRawValues.includes(value)) {
		return undefined
	}

	return value as Kind
}