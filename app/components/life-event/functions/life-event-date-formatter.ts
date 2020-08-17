import { LifeEvent } from "@/utils/storage/models/life-event"
import { formattedDate } from "@/utils/storage/providers/date-formatter"

export function formattedDateRange(event: LifeEvent): string {
	if(event.dateStarted && event.dateEnded) {
		return `${formattedDate(event.dateStarted)} – ${formattedDate(event.dateEnded)}`
	} else if(event.dateStarted && !event.dateEnded) {
		return `${formattedDate(event.dateStarted)} – PRS.`
	} else if(event.dateEnded) {
		return formattedDate(event.dateEnded)
	}

	return ""
}