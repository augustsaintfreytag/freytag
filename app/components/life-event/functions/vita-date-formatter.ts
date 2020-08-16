import { Vita } from "@/utils/storage/models/vita-event"
import { formattedDate } from "@/utils/storage/providers/date-formatter"

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