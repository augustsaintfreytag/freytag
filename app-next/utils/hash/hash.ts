export function hashValue(input: string): string {
	let value = 0

	for (let i = 0; i < input.length; i++) {
		value = (Math.imul(31, value) + input.charCodeAt(i)) | 0
	}

	return value.toString(16)
}
