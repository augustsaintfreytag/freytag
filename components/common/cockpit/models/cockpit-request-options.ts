export default interface CockpitRequestOptions {

	filter?: {[key: string]: any}
	fields?: {[key: string]: number|undefined}
	limit?: number
	skip?: number
	sort?: {[key: string]: number|undefined}
	populate?: boolean
	lang?: string

}