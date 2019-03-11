import { Component, Vue } from "vue-property-decorator"
import { Vita } from "~/components/common/cockpit/models/vita-event"
import { LifePageData } from "./life-page-data"
import { LifePageMapper } from "./life-page-mapper"

const data: LifePageData = {
	lifeFilter: undefined,
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