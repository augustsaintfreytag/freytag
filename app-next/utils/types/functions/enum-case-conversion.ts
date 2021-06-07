export function enumCaseFromRawValue<Value, RawValue>(rawValue: RawValue, caseValues: Value[]): Value | undefined {
	for (const caseValue of caseValues) {
		if (rawValue !== (caseValue as unknown as RawValue)) {
			continue
		}

		return caseValue as Value
	}

	return undefined
}
