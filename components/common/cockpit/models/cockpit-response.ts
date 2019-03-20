import { CockpitEntry } from "./cockpit-entry"
import { CockpitFieldDefinition } from "./cockpit-field-definition"

export interface CockpitCollectionResponse {

	total: number,
	fields: {[key: string]: CockpitFieldDefinition}
	entries: CockpitEntry[]

}

export interface CockpitSingletonResponse {

	[key: string]: any

}