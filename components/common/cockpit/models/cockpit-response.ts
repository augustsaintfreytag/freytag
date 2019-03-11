export default interface CockpitResponse {

	total: number,
	fields: {[key: string]: CockpitFieldDefinition}
	entries: CockpitEntry[]

}

export interface CockpitFieldDefinition {

	type: string
	localize: boolean
	name: string
	options: any[]

}

export type CockpitEntry = any