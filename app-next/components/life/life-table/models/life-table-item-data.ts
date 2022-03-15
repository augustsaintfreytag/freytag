import { LifeEventKind as Kind } from "~/api/cockpit/records/life-event/library/life-event-kind"
import { OpenDateInterval } from "~/utils/date/library/intervals"
import { UUID } from "~/utils/uuid/uuid"

export interface LifeTableItemData {
	id: UUID
	name: string
	kind: Kind
	interval: OpenDateInterval
	format: string
	role?: string
	context?: string
	description?: string
	highlighted?: boolean
}
