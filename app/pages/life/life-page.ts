import { Component, Vue } from "vue-property-decorator"
import LifeEventComponent from "~/components/life-event/life-event.vue"
import LifeEventCardComponent from "~/components/life-event/life-event-card.vue"
import { Filter, fetchLifeEvents, SortingMode, SortingProperties, sortedLifeEvents, toggleDefinitions, headerDefinitions, isValidSortingMode, toggleFilter } from "./life-page-data-provider"
import { Head } from "~/components/common/head/head"
import { UUID } from "~/components/common/library/uuid"
import { PageData } from "~/components/common/pages/library/page-data"
import { Vita } from "~/components/common/storage/models/vita-event"
import { Index } from "~/components/common/library"
import { Dictionary } from "~/components/common/library/dictionary"

interface PartialAsyncData extends PageData {
	lifeRawEvents: Vita.Event[]
	lifeEvents: Vita.Event[],
	lifeEventIndexMap: Dictionary<Index>
}

interface Data extends PartialAsyncData {
	lifeFilter: string|undefined
	lifeSortingMode: SortingMode
	lifeSortingIsReversed: boolean
	lifeSelectedItemId: UUID|undefined,
	lifeRawEvents: Vita.Event[]
	lifeEvents: Vita.Event[],
	lifeEventIndexMap: Dictionary<Index>
}

@Component({
	components: {
		LifeEventComponent,
		LifeEventCardComponent
	},

	async asyncData(): Promise<PartialAsyncData> {
		const unsortedEvents = await fetchLifeEvents()

		if (!unsortedEvents) {
			throw { statusCode: 404, message: "Life events could not be loaded." }
		}

		const sortingProperties: SortingProperties = { filter: undefined, sortingMode: "time", sortingIsReversed: true }
		const { events, eventIndicesById } = sortedLifeEvents(unsortedEvents, sortingProperties)

		return {
			lifeRawEvents: unsortedEvents,
			lifeEvents: events,
			lifeEventIndexMap: eventIndicesById
		}
	},

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Life"),
			meta: [
				{hid: "description", name: "description", content: "Listing of all recorded projects, work-in-progress and completed, for categories life, education, film, development, artwork, and photography, presented by time, format, role, location, and context surrounding each entry."}
			]
		})
	}
})
export default class LifePage extends Vue implements Data {

	// Data Properties

	lifeFilter: string|undefined
	lifeSortingMode: SortingMode = "time"
	lifeSortingIsReversed: boolean = true
	lifeSelectedItemId: UUID|undefined
	lifeRawEvents: Vita.Event[] = []
	lifeEvents: Vita.Event[] = []
	lifeEventIndexMap: Dictionary<Index> = {}

	// Computed Properties

	get eventToggleDefinitions() {
		return toggleDefinitions
	}

	get eventHeaderDefinitions() {
		return headerDefinitions
	}

	get lifeSelectedItemSet() {	
		if (!this.lifeSelectedItemId) {
			return undefined
		}
	
		const selectedItemId = this.lifeSelectedItemId
		const index = this.lifeEventIndexMap[selectedItemId]
		
		return {
			current: this.lifeEvents[index],
			previous: this.lifeEvents[index - 1],
			next: this.lifeEvents[index + 1]
		}
	}

	// Control

	toggleFilter(filter: Filter) {
		this.lifeFilter = filter
	}
	
	toggleSortingMode(mode: SortingMode) {
		if (this.lifeSortingMode === mode) {
			this.lifeSortingIsReversed = !this.lifeSortingIsReversed
			return
		}
	
		this.setSortingMode(mode)
	}

	setSortingMode(mode: SortingMode) {
		if (!isValidSortingMode(mode)) {
			console.error(`Sorting mode '${mode}' is not supported.`)
			return
		}
	
		this.lifeSortingMode = mode
		this.lifeSortingIsReversed = false
	}

	mapFilteredEvents() {
		const rawEvents = this.lifeRawEvents
		const sortingProperties: SortingProperties = { filter: undefined, sortingMode: "time", sortingIsReversed: true }
		const { events, eventIndicesById } = sortedLifeEvents(rawEvents, sortingProperties)

		this.lifeEvents = events
		this.lifeEventIndexMap = eventIndicesById
	}

	// Events

	didToggleFilter(_event: MouseEvent, filter: string) {
		this.toggleFilter(filter)
		this.mapFilteredEvents()
	}

	didToggleSorting(_event: MouseEvent, sortingMode: string) {
		if (!sortingMode) {
			return
		}

		this.toggleSortingMode(sortingMode)
		this.mapFilteredEvents()
	}

	didRequestLifeEvent(id: UUID|undefined) {
		this.lifeSelectedItemId = id
	}

}