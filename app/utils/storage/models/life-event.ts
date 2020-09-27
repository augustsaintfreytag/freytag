import { eventKindFromRawValue, Kind } from "@/utils/storage/models/life-event-kind"
import { CockpitDateConversion, CockpitEntry, CockpitMetaData } from "cockpit-access"
import { SortableModel } from "../library/any-sortable-model"

// Live Model

export class LifeEvent implements SortableModel<any> {

	[key: string]: any

	display: boolean
	name: string
	kind: Kind|undefined
	format: string|undefined
	dateStarted: Date|undefined
	dateEnded: Date|undefined
	role: string|undefined
	context: string|undefined
	location: string|undefined
	description: string|undefined
	meta: CockpitMetaData

	constructor(event: LifeEventEntry) {
		this.display = event.display
		this.name = event.name
		this.kind = eventKindFromRawValue(event.kind)
		this.format = event.format || undefined
		this.dateStarted = CockpitDateConversion.dateFromString(event.dateStarted)
		this.dateEnded = CockpitDateConversion.dateFromString(event.dateEnded)
		this.role = event.role || undefined
		this.context = event.context || undefined
		this.location = event.location || undefined
		this.description = event.description || undefined
		this.meta = new CockpitMetaData(event)
	}

}

// Stored Model

export interface LifeEventEntry extends CockpitEntry {

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