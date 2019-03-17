import { CockpitEntry } from "./cockpit-entry"
import { CockpitFieldDefinition } from "./cockpit-field-definition"

export default interface CockpitResponse {

	total: number,
	fields: {[key: string]: CockpitFieldDefinition}
	entries: CockpitEntry[]

}