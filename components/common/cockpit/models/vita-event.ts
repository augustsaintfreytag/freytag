import { Conversion } from "../providers/conversion"
import { Kind } from "./kind"
import { CockpitEntry } from "./cockpit-entry"
import MetaData from "./meta-data"

export namespace Vita {

	// Live Model

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
		meta: MetaData
	
		constructor(event: EventEntry) {
			this.display = event.display
			this.name = event.name
			this.kind = event.kind as Kind
			this.format = event.format || undefined
			this.dateStarted = Conversion.dateFromString(event.dateStarted)
			this.dateEnded = Conversion.dateFromString(event.dateEnded)
			this.role = event.role || undefined
			this.context = event.context || undefined
			this.location = event.location || undefined
			this.description = event.description || undefined
			this.meta = new MetaData(event)
		}
	
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

}