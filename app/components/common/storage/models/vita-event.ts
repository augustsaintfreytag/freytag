import { ConversionProvider } from "~/components/common/cockpit/providers/conversion-provider"
import { CockpitEntry } from "~/components/common/cockpit/models/cockpit-entry"
import { SortableModel } from "../library/any-sortable-model"
import MetaData from "./meta-data"

export namespace Vita {

	enum EventKind {
		Life = "Life",
		Education = "Education", 
		External = "External", 
		Film = "Film", 
		Artwork = "Artwork", 
		Photography = "Photography", 
		Development = "Development"
	}

	const eventKindRawValues: string[] = [
		"Life",
		"Education", 
		"External", 
		"Film", 
		"Artwork", 
		"Photography", 
		"Development"
	]

	function eventKindFromRawValue(value: string): EventKind|undefined {
		if (!eventKindRawValues.includes(value)) {
			return undefined
		}

		return value as EventKind
	}

	// Live Model

	export class Event implements SortableModel<any> {

		[key: string]: any

		display: boolean
		name: string
		kind: EventKind|undefined
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
			this.kind = eventKindFromRawValue(event.kind)
			this.format = event.format || undefined
			this.dateStarted = ConversionProvider.dateFromString(event.dateStarted)
			this.dateEnded = ConversionProvider.dateFromString(event.dateEnded)
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