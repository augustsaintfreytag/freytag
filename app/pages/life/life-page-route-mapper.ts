import { Dictionary } from "@nuxt/vue-app-edge"
import { LifePageData } from "./life-page-data"

export namespace LifePageRouteMapper {

	export function mapPersistentParameters(data: LifePageData, query: Dictionary<string|string[]>) {
		forEachParameterKey(parameterKey => {
			const parameterValue = query[parameterKey]
			if (!parameterValue || typeof parameterValue !== "string") {
				return
			}

			data[parameterKey] = importedParameterValue(parameterValue)
		})
	}

	export function storePersistentParameters(data: LifePageData, query: Dictionary<string|string[]>) {
		forEachParameterKey(parameterKey => {
			query[parameterKey] = data[parameterKey]
		})
	}

	function importedParameterValue(rawValue: string): string|number|boolean {
		if (rawValue === "true" || rawValue === "false") {
			return rawValue === "true" ? true : false
		}

		if (!isNaN(Number(rawValue))) {
			return Number(rawValue)
		}

		return rawValue
	}

	function forEachParameterKey(callback: (parameterKey: string) => void) {
		["lifeFilter", "lifeSortingMode", "lifeSortingIsReversed"].forEach(callback)
	}

}