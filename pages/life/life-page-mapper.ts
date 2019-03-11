import CockpitDataProvider from "~/components/common/cockpit/providers/cockpit-data-provider"
import { Vita } from "~/components/common/cockpit/models/vita-event"
import { LifePageData } from "./life-page-data"

export namespace LifePageMapper {

	interface SortingKeyPair {
		primary: string
		secondary: string|undefined
	}
	
	export type SortingMode = string

	export const sortingOptions: {[key: string]: SortingKeyPair|undefined} = {
		time: {primary: "dateEnded", secondary: "dateStarted"},
		format: {primary: "format", secondary: undefined}
	}

	export async function updateLifeEvents(data: LifePageData): Promise<void> {
		try {
			data.unsortedLifeEvents = await CockpitDataProvider.lifeEvents()
		} catch (err) {
			console.error(`Did not get results. ${err}`)
		}
	}

	// Direct Mapping

	export function mapSortedLifeEvents(data: LifePageData) {
		const sortedLifeEvents = sortedLifeEventsWithMode(data.unsortedLifeEvents, data.lifeSortingMode, data.lifeSortingIsReversed)
		data.lifeEvents = sortedLifeEvents
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

	export function toggleSortingMode(data: LifePageData, mode: SortingMode) {
		if (data.lifeSortingMode === mode) {
			data.lifeSortingIsReversed = !data.lifeSortingIsReversed
			return
		}

		setSortingMode(data, mode)
	}

	function isValidSortingMode(mode: SortingMode): boolean {
		return sortingOptions[mode] !== undefined
	}

	// Sorting
	
	function sortedLifeEventsWithMode(events: Vita.Event[], mode: SortingMode, reversed: boolean = false): Vita.Event[] {
		const options = sortingOptions[mode]!
		return sortedLifeEventsWithOptions(events, {sortingKeyPair: options, sortingReversed: reversed})
	}

	function sortedLifeEventsWithOptions(events: Vita.Event[], options: {sortingKeyPair: SortingKeyPair, sortingReversed: boolean}): Vita.Event[] {
		const sortingKeyPrimary = options.sortingKeyPair.primary
		const sortingKeySecondary = options.sortingKeyPair.secondary || options.sortingKeyPair.primary

		type LifeEventDictionary = {[key: string]: any}
		
		events = events.sort((a: LifeEventDictionary, b: LifeEventDictionary) => {
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

		// Events are already reversed by default, no action required.

		if (options.sortingReversed) {
			return events
		} else {
			return events.reverse()
		}
	}

}