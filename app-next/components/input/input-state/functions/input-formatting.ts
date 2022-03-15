export function descriptionForInputValidity(state: ValidityState): string | undefined {
	if (state.valid) {
		return undefined
	}

	if (state.valueMissing) {
		return "Missing"
	}

	if (state.tooShort) {
		return "Too short"
	}

	if (state.tooLong) {
		return "Too long"
	}

	if (state.patternMismatch) {
		return "Incorrect format"
	}

	return "Invalid"
}
