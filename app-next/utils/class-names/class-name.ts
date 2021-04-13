import { Dictionary } from "~/utils/types/library/dictionary"

export function className(...components: (string | boolean | undefined)[]): string {
	const classNames = new Set<string>()

	for (const className of components) {
		if (typeof className !== "string") {
			continue
		}

		classNames.add(className)
	}

	return Array.from(classNames).join(" ")
}

export function classNameFromMap(components: Dictionary<string, boolean | undefined>): string {
	const classNames = new Set<string>()

	for (const className in components) {
		const probe = components[className]
		if (!probe) {
			continue
		}

		classNames.add(className)
	}

	return Array.from(classNames).join(" ")
}
