export function range(start: number, end: number): number[] {
	const length = end - start
	return Array.from({ length }, (_, index) => index)
}

export function openRange(primary: number, secondary?: number): number[] {
	let [start, end] = [0, 0]

	if (secondary !== undefined) {
		start = primary
		end = secondary
	} else {
		start = 0
		end = primary
	}

	return range(start, end)
}
