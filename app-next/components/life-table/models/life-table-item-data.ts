import { LifeEventKind as Kind } from "~/utils/api/records/life-event/library/life-event-kind"
import { OpenDateInterval } from "~/utils/date/library/intervals"

export type LifeTableItemData = {
	name: string
	kind: Kind
	interval: OpenDateInterval
	format: string
	role?: string
	context?: string
	description?: string
}
