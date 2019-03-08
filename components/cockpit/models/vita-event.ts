import { UUID } from "~/components/library/uuid"
import { CockpitEntry } from "./cockpit-response"

export namespace Vita {

	export class Event {

		display: boolean
		name: string
		kind: Kind
		format: string|undefined
		dateStarted: Date|undefined
		dateEnded: Date|undefined
		role: string|undefined
		context: string|undefined
		location: string|undefined
		description: string|undefined
	
		constructor(event: EventEntry) {
			this.display = event.display
			this.name = event.name
			this.kind = event.kind as Kind
			this.format = event.format || undefined
			this.dateStarted = date(event.dateStarted)
			this.dateEnded = date(event.dateEnded)
			this.role = event.role || undefined
			this.context = event.context || undefined
			this.location = event.location || undefined
			this.description = event.description || undefined
		}
	
	}

	export enum Kind {
		Work = "Work",
		Life = "Life",
		Education = "Education"
	}

	// Stored Model

	export interface EventEntry extends CockpitEntry {

		display: boolean
		name: string
		kind: string
		format: string
		dateStarted: string
		dateEnded: string
		role: string
		context: string
		location: string
		description: string

	}

	// Conversion

	function date(string: string): Date|undefined {
		const date = new Date(string)
		
		if (isNaN(date.getDate())) {
			return undefined
		}

		return date
	}

}