import { Component, Vue } from "vue-property-decorator"
import { Vita } from "~/components/common/cockpit/models/vita-event"
import { LifePageData } from "./life-page-data"
import { LifePageMapper } from "./life-page-mapper"

const data: LifePageData = {
	lifeFilter: undefined,
	lifeSortingMode: "time",
	lifeSortingIsReversed: true,
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
	},

	computed: {
		eventToggleDefinitions: () => {
			return [
				{identifier: "all", name: "All", filter: undefined},
				{identifier: "life", name: "Life", filter: "Life"},
				{identifier: "education", name: "Education", filter: "Education"},
				{identifier: "film", name: "Film", filter: "Film"},
				{identifier: "development", name: "Development", filter: "Development"},
				{identifier: "artwork", name: "Artwork", filter: "Artwork"},
				{identifier: "photography", name: "Photography", filter: "Photography"}
			]
		},

		eventHeaderDefinitions: () => {
			return [
				{identifier: "time", name: "Span", sortable: true},
				{identifier: "format", name: "Format", sortable: true},
				{identifier: "role", name: "Role", sortable: false},
				{identifier: "location", name: "Location", sortable: false},
				{identifier: "context", name: "Context", sortable: false}
			]
		}
	}

})
export default class LifePage extends Vue {

	// Events

	didToggleFilter(_event: MouseEvent, filter: string) {
		const data = this.$data as LifePageData

		LifePageMapper.toggleFilter(data, filter)
		LifePageMapper.mapSortedLifeEvents(data)
	}

	didToggleSorting(_event: MouseEvent, sortingMode: string) {
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