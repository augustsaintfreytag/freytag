import { Dictionary } from "~/library/dictionary";

export interface MetaTag extends Dictionary<string|undefined> {

	hid: string
	name?: string
	content?: string
	type?: string
	href?: string
	rel?: string
	charset?: string
	
}