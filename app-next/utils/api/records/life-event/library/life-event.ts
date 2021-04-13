import { CockpitEntry } from "cockpit-access"

export type LifeEvent = CockpitEntry & {
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
