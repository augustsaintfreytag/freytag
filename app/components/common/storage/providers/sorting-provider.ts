import { AnySortableModel } from "../library/any-sortable-model"

export namespace SortingProvider {

	// Aliases

	export type Options = {sortingKeyPair: KeyPair, sortingReversed?: boolean}

	// Functionality

	export function sortedModels<T extends AnySortableModel>(models: T[], options: Options): T[] {
		const sortingKeyPrimary = options.sortingKeyPair.primary
		const sortingKeySecondary = options.sortingKeyPair.secondary || options.sortingKeyPair.primary

		models = models.sort((a: T, b: T) => {
			const aValue = a[sortingKeyPrimary] || a[sortingKeySecondary] || ""
			const bValue = b[sortingKeyPrimary] || b[sortingKeySecondary] || ""

			if (aValue < bValue) {
				return -1
			}
			
			if(aValue > bValue) {
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

	// Library

	export interface KeyPair {
		primary: string
		secondary?: string
	}

}