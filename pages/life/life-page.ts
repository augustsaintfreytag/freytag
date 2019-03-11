import { Component, Vue } from "vue-property-decorator"
import CockpitDataProvider from "~/components/common/cockpit/providers/cockpit-data-provider"
import { Vita } from "~/components/common/cockpit/models/vita-event"

namespace LifePageData {

	export async function updateLife(data: any): Promise<void> {
		try {
			let events = await CockpitDataProvider.vitaEvents()
			const sortingKey = "dateStarted"
			const sortingKeySecondary = "dateEnded"

			events = events.sort((a: Vita.Event, b: Vita.Event) => {
				const aValue = a[sortingKey] || a[sortingKeySecondary] || 0
				const bValue = b[sortingKey] || b[sortingKeySecondary] || 0

				if (aValue < bValue) {
					return -1
				}
				
				if(aValue > bValue) {
					return 1
				}

				return 0
			})

			data.vitaEvents = events
		} catch (err) {
			console.error(`Did not get results. ${err}`)
		}
	}

}

@Component({
	
	data() {
		return {
			vitaEvents: []
		}
	},

	async asyncData() {
		const data: any = {}
		await LifePageData.updateLife(data)

		return data
	}

})
export default class LifePage extends Vue {

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
		return `${this.formattedMonth(date.getDate() + 1)}/${date.getFullYear()}`
	}

	formattedMonth(month: number): string {
		return month < 10 ? "0" + month : String(month)
	}

}