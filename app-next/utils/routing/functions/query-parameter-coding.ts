export function encodedURIValue(value: string | number | boolean): string {
	if (typeof value === "boolean") {
		return value === true ? "1" : "0"
	}

	return encodeURIComponent(String(value))
}

export function decodedURIStringValue(value: string): string | undefined {
	const decodedValue = decodeURIComponent(value)
	if (!decodedValue) {
		return undefined
	}

	return decodedValue
}

export function decodedURINumericValue(value: string): number | undefined {
	const decodedRawValue = decodeURIComponent(value)
	const decodedValue = Number(decodedRawValue)
	if (isNaN(decodedValue)) {
		return undefined
	}

	return decodedValue
}

export function decodedURIBooleanValue(value: string): boolean | undefined {
	if (value === "1") {
		return true
	}

	if (value === "0") {
		return false
	}

	return undefined
}
