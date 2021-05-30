import { QueryParameters } from "~/types/page"
import { decodedURIStringValue } from "~/utils/routing/functions/query-parameter-coding"

export function rawParameterValueFromQuery(query: QueryParameters, key: string): string {
	const value = query[key]
	if (value instanceof Array) {
		return value.join()
	}

	return value || ""
}

export function valueFromRawValue<Value>(query: QueryParameters, key: string, transformer: (rawValue: string) => Value): Value | undefined {
	const rawValue = decodedURIStringValue(rawParameterValueFromQuery(query, key))
	if (!rawValue) {
		return undefined
	}

	return transformer(rawValue)
}
