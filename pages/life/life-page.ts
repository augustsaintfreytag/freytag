import { Component, Vue } from "vue-property-decorator"
import CockpitDataProvider from "~/components/common/cockpit/providers/cockpit-data-provider"
import { Vita } from "~/components/common/cockpit/models/vita-event"

namespace LifePageMapper {

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
import { LifePageData } from "./life-page-data"

const data: LifePageData = {
	lifeSortingMode: "time",
	lifeSortingIsReversed: false,
	unsortedLifeEvents: [],
	lifeEvents: []
}

@Component({

	data() {
		return data
	},

	async asyncData() {
		await LifePageMapper.updateLifeEvents(data)
		LifePageMapper.mapSortedLifeEvents(data)

		return data
	}

})
export default class LifePage extends Vue {

	// Events

	didToggleSorting(sortingMode: string): void {
		const data = this.$data as LifePageData

		if (!sortingMode) {
			return
		}

		LifePageMapper.toggleSortingMode(data, sortingMode)
		LifePageMapper.mapSortedLifeEvents(data)
	}

	// Date

	formattedDateRange(event: Vita.Event): string {
		if(event.dateStarted && event.dateEnded) {
			return `${this.formattedDate(event.dateStarted)} – ${this.formattedDate(event.dateEnded)}`
		} else if(event.dateStarted && !event.dateEnded) {
			return `${this.formattedDate(event.dateStarted)} – PRS.`
		} else if(event.dateEnded) {
			return this.formattedDate(event.dateEnded)
		}

		return ""
	}

	formattedDate(date: Date): string {
		return `${this.formattedMonth(date.getMonth() + 1)}/${date.getFullYear()}`
	}

	formattedMonth(month: number): string {
		return month < 10 ? "0" + month : String(month)
	}

}