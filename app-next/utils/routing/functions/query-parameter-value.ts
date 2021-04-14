import { ParsedUrlQuery } from "node:querystring"
import { decodedURIStringValue } from "~/utils/routing/functions/query-parameter-coding"

export function rawParameterValueFromQuery(query: ParsedUrlQuery, key: string): string {
	const value = query[key]
	if (value instanceof Array) {
		return value.join()
	}

	return value || ""
}

export function valueFromRawValue<Value>(query: ParsedUrlQuery, key: string, transformer: (rawValue: string) => Value): Value | undefined {
	const rawValue = decodedURIStringValue(rawParameterValueFromQuery(query, key))
	if (!rawValue) {
		return undefined
	}

	return transformer(rawValue)
}
