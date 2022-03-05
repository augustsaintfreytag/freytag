export type HashValue = string

/** Computes a fast djb2 hash value from the given string.
 *  Returns the resulting hash value as a hexadecimal string.
 */
export function hashValue(string: string): HashValue {
	const length = string.length
	let hash = 5381

	for (let index = 0; index < length; index++) {
		hash = (hash * 33) ^ string.charCodeAt(index)
	}

	return (hash >>> 0).toString(16)
}
