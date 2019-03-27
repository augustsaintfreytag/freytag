import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import { Vita } from "~/components/common/storage/models/vita-event"
import { SortingProvider } from "~/components/common/storage/providers/sorting-provider"
import { LifePageData } from "./life-page-data"

export namespace LifePageMapper {
	
	export type SortingMode = string
	export type Filter = string

	export const sortingKeyPairs: {[key: string]: SortingProvider.KeyPair|undefined} = {
		time: {primary: "dateStarted", secondary: "dateEnded"},
		format: {primary: "format", secondary: undefined}
	}

	export const sortingValueFallbacks: {[key: string]: SortingProvider.ValueFallback<any>} = {
		time: {primary: undefined, secondary: new Date()},
		format: {primary: undefined, secondary: undefined}
	}

	// Fetching

	export async function updateLifeEvents(data: LifePageData): Promise<void> {
		try {
			data.unsortedLifeEvents = await CockpitDataProvider.lifeEvents()
		} catch (error) {
			console.error(`Could not fetch life events. ${error}`)
		}
	}

	// Mapping

	export function mapSortedLifeEvents(data: LifePageData) {
		let events = data.unsortedLifeEvents

		if (data.lifeFilter) {
			events = filteredLifeEventsWithOptions(events, {filter: data.lifeFilter})
		}

		events = sortedLifeEventsWithMode(events, data.lifeSortingMode, data.lifeSortingIsReversed)
		data.lifeEvents = events
		data.lifeEventIndexMap = events.reduce((map, event, index) => {
			map[event.meta.id] = index
			return map
		}, {})
	}

	// Sorting Modes

	export function setSortingMode(data: LifePageData, mode: SortingMode) {
		if (!isValidSortingMode(mode)) {
			console.error(`Sorting mode '${mode}' is not supported.`)
			return
		}

		data.lifeSortingMode = mode
		data.lifeSortingIsReversed = false
	}

	export function toggleFilter(data: LifePageData, filter: Filter) {
		data.lifeFilter = filter
	}

	export function toggleSortingMode(data: LifePageData, mode: SortingMode) {
		if (data.lifeSortingMode === mode) {
			data.lifeSortingIsReversed = !data.lifeSortingIsReversed
			return
		}

		setSortingMode(data, mode)
	}

	function isValidSortingMode(mode: SortingMode): boolean {
		return sortingKeyPairs[mode] !== undefined
	}

	// Sorting
	
	function sortedLifeEventsWithMode(events: Vita.Event[], mode: SortingMode, reversed: boolean = false): Vita.Event[] {
		const sortingKeyPair = sortingKeyPairs[mode]!
		const sortingValueFallback = sortingValueFallbacks[mode]!

		return sortedLifeEventsWithOptions(events, {sortingKeyPair, sortingValueFallback, sortingReversed: reversed})
	}

	function filteredLifeEventsWithOptions(events: Vita.Event[], options: {filter: Filter}): Vita.Event[] {
		return events.filter(event => {
			return event.kind === options.filter
		})
	}

	function sortedLifeEventsWithOptions<SortedValue>(events: Vita.Event[], options: {sortingKeyPair: SortingProvider.KeyPair, sortingValueFallback: SortingProvider.ValueFallback<SortedValue>, sortingReversed: boolean}): Vita.Event[] {
		return SortingProvider.sortedModels(events, options)
	}

}