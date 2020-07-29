import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/head/head"
import { Index } from "~/components/common/library"
import { Dictionary } from "~/components/common/library/dictionary"
import { UUID } from "~/components/common/library/uuid"
import { PageData } from "~/components/common/pages/library/page-data"
import { Vita } from "~/components/common/storage/models/vita-event"
import LifeEventCardComponent from "~/components/life-event/life-event-card.vue"
import LifeEventComponent from "~/components/life-event/life-event.vue"
import { fetchLifeEvents, Filter, headerDefinitions, isValidSortingMode, sortedLifeEvents, SortingMode, SortingProperties, toggleDefinitions } from "./life-page-data-provider"

interface Data extends PageData {
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

	async asyncData(): Promise<Data> {
		const unsortedEvents = await fetchLifeEvents()

		if (!unsortedEvents) {
			throw { statusCode: 404, message: "Life events could not be loaded." }
		}

		const sortingProperties: SortingProperties = { filter: undefined, sortingMode: "time", sortingIsReversed: true }
		const { events, eventIndicesById } = sortedLifeEvents(unsortedEvents, sortingProperties)

		return {
			lifeFilter: undefined,
			lifeSortingMode: "time",
			lifeSortingIsReversed: true,
			lifeSelectedItemId: undefined,
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
	lifeSortingMode!: SortingMode
	lifeSortingIsReversed!: boolean
	lifeSelectedItemId: UUID|undefined
	lifeRawEvents!: Vita.Event[]
	lifeEvents!: Vita.Event[]
	lifeEventIndexMap!: Dictionary<Index>

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
		this.mapFilteredEvents()
	}
	
	toggleSortingMode(mode: SortingMode) {
		if (!mode) {
			console.error(`Can not toggle sorting mode without a specifier.`)
			return
		}

		if (this.lifeSortingMode === mode) {
			this.lifeSortingIsReversed = !this.lifeSortingIsReversed
			this.mapFilteredEvents()
			return
		}
	
		this.setSortingMode(mode)
		this.mapFilteredEvents()
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
		const sortingProperties: SortingProperties = { filter: this.lifeFilter, sortingMode: this.lifeSortingMode, sortingIsReversed: this.lifeSortingIsReversed }
		const { events, eventIndicesById } = sortedLifeEvents(rawEvents, sortingProperties)

		this.lifeEvents = events
		this.lifeEventIndexMap = eventIndicesById
	}

	// Actions

	openLifeEvent(id: UUID) {
		this.lifeSelectedItemId = id
	}

	closeLifeEvent() {
		this.lifeSelectedItemId = undefined
	}

}