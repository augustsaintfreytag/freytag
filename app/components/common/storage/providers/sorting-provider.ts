import { AnySortableModel } from "../library/any-sortable-model"

export namespace SortingProvider {

	// Aliases

	export type Options<Value> = {sortingKeyPair: KeyPair, sortingValueFallback: ValueFallback<Value>, sortingReversed?: boolean}
	export type AnyValueFallback = ValueFallback<any>
	
	// Library

	export interface KeyPair {
		primary: string
		secondary?: string
	}

	export interface ValueFallback<Value> {
		primary?: Value,
		secondary?: Value
	}

	// Functionality

	export function sortedModels<Model extends AnySortableModel<Value>, Value>(models: Model[], options: Options<Value>): Model[] {
		const sortingKeyPrimary = options.sortingKeyPair.primary
		const sortingKeySecondary = options.sortingKeyPair.secondary || options.sortingKeyPair.primary

		models = models.sort((lhs: Model, rhs: Model) => {
			const lhsValue = lhs[sortingKeyPrimary] || options.sortingValueFallback.primary || lhs[sortingKeySecondary] || options.sortingValueFallback.secondary || ""
			const rhsValue = rhs[sortingKeyPrimary] || options.sortingValueFallback.primary || rhs[sortingKeySecondary] || options.sortingValueFallback.secondary || ""

			if (lhsValue < rhsValue) {
				return -1
			}
			
			if(lhsValue > rhsValue) {
				return 1
			}

			return 0
		})

		if (options.sortingReversed) {
			return models.reverse()
		} else {
			return models
		}
	}

}