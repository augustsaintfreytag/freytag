export function splitWords(text: string): [string[], string[]] {
	const words = text.split(" ")

	if (words.length < 2) {
		return [words, []]
	}

	const pivot = Math.max(0, words.length - 2)
	const leftWords = words.slice(0, pivot)
	const rightWords = words.slice(pivot, words.length)

	return [leftWords, rightWords]
}

export function joinSplitWords(words: string[], cap: boolean): string {
	if (!words.length) {
		return ""
	}

	let joinedWords = words.join(" ")

	if (cap) {
		joinedWords += " "
	}

	return joinedWords
}
