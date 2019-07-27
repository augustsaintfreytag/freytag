import { Dictionary } from "vue-router/types/router"
import { Index, IndexDistance } from "../../library"

type SequenceMap = Dictionary<number|undefined>

export default class Rot13 {

	private static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	private static rotation: IndexDistance = 13

	private sequence: string[]
	private sequenceIndexMap: Dictionary<Index|undefined>

	constructor() {
		this.sequence = [...Rot13.alphabet.split(""), ...Rot13.alphabet.toLowerCase().split("")]
		this.sequenceIndexMap = {}

		this.sequenceIndexMap = this.sequence.reduce((map: SequenceMap, character: string, index: Index) => {
			map[character] = index
			return map
		}, {})
	}

	// Coding

	encoded(input: string): string {
		return this.coded(input, Rot13.rotation)
	}

	decoded(input: string): string {
		return this.coded(input, this.sequence.length * Math.ceil(Rot13.rotation / this.sequence.length) - Rot13.rotation)
	}

	coded(input: string, offset: IndexDistance): string {
		const outputSequence: string[] = []

		for (const character of input) {
			const characterIndex = this.sequenceIndexMap[character]
			if (characterIndex === undefined) {
				outputSequence.push(character)
				continue
			}

			outputSequence.push(
				this.offset(characterIndex, offset)
			)
		}

		return outputSequence.join("")
	}

	// Cipher

	offset(index: Index, offset: IndexDistance): string {
		const offsetIndex = (index + offset) % this.sequence.length

		if (offsetIndex < 0) {
			throw new RangeError(`Index from initial ${index} and offset ${offset} results in negative index, out of range.`)
		}

		return this.sequence[offsetIndex]
	}

}