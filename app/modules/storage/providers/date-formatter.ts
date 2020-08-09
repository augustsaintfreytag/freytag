import { Vita } from "../models/vita-event"

export namespace DateFormatter {

	export function formattedDateRange(event: Vita.Event): string {
		if(event.dateStarted && event.dateEnded) {
			return `${formattedDate(event.dateStarted)} – ${formattedDate(event.dateEnded)}`
		} else if(event.dateStarted && !event.dateEnded) {
			return `${formattedDate(event.dateStarted)} – PRS.`
		} else if(event.dateEnded) {
			return formattedDate(event.dateEnded)
		}

		return ""
	}

	function formattedDate(date: Date): string {
		return `${formattedMonth(date.getMonth() + 1)}/${date.getFullYear()}`
	}

	function formattedMonth(month: number): string {
		return month < 10 ? "0" + month : String(month)
	}

}