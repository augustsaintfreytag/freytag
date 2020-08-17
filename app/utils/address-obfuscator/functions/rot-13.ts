import { Dictionary } from "vue-router/types/router"
import { Index, IndexDistance } from "../../common/library"

// Library

type SequenceMap = Dictionary<number|undefined>

// Properties

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const rotation: IndexDistance = 13

const { sequence, sequenceIndexMap } = (() => {
	const sequence: string[] = [...alphabet.split(""), ...alphabet.toLowerCase().split("")]
	const sequenceIndexMap: Dictionary<Index|undefined> = sequence.reduce((map: SequenceMap, character: string, index: Index) => {
		map[character] = index
		return map
	}, {})

	return { sequence, sequenceIndexMap }
})()

// Coding

export function encoded(input: string): string {
	return coded(input, rotation)
}

export function decoded(input: string): string {
	return coded(input, sequence.length * Math.ceil(rotation / sequence.length) - rotation)
}

function coded(input: string, offset: IndexDistance): string {
	const outputSequence: string[] = []

	for (const character of input) {
		const characterIndex = sequenceIndexMap[character]
		if (characterIndex === undefined) {
			outputSequence.push(character)
			continue
		}

		outputSequence.push(
			offsetCharacter(characterIndex, offset)
		)
	}

	return outputSequence.join("")
}

// Cipher

function offsetCharacter(index: Index, offset: IndexDistance): string {
	const offsetIndex = (index + offset) % sequence.length

	if (offsetIndex < 0) {
		throw new RangeError(`Index from initial ${index} and offset ${offset} results in negative index, out of range.`)
	}

	return sequence[offsetIndex]
}