export function splitWords(text: string): [string[], string[], boolean, boolean] {
	const words = text.split(" ")

	if (words.length < 2) {
		return [words, [], words.length > 0, false]
	}

	const pivot = Math.max(0, words.length - 2)
	const leftWords = words.slice(0, pivot)
	const rightWords = words.slice(pivot, words.length)

	const hasLeftWords = leftWords.length > 0
	const hasRightWords = rightWords.length > 0

	return [leftWords, rightWords, hasLeftWords, hasRightWords]
}
