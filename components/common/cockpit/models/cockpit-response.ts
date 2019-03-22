import { CockpitEntry } from "./cockpit-entry"
import { CockpitFieldDefinition } from "./cockpit-field-definition"

export type AnyCockpitResponse = any

export interface CockpitCollectionResponse extends AnyCockpitResponse {

	total: number,
	fields: {[key: string]: CockpitFieldDefinition}
	entries: CockpitEntry[]

}

export interface CockpitSingletonResponse extends AnyCockpitResponse {

	[key: string]: any

}

export type CockpitImageResponse = string