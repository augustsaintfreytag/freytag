import { CSSProperties } from "react"
import { Dictionary } from "~/utils/types/library/dictionary"

type StyleVariables = Dictionary<string, string>

function formattedVariableName(key: string): string {
	return key.replace(/[A-Z]/g, "-$&").toLowerCase()
}

export function propertiesWithStyleVariables(variables: StyleVariables, existingProperties?: CSSProperties): CSSProperties {
	const properties: Dictionary<string, string> = (existingProperties as Dictionary<string, string>) ?? {}

	for (const element of Object.entries(variables)) {
		const [key, value] = element
		const name = "--" + formattedVariableName(key)

		if (!value) {
			continue
		}

		properties[name] = value
	}

	return properties as CSSProperties
}
