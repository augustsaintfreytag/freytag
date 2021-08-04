import { UUID } from "~/api/common/library/uuid"
import { LifeEventKind as Kind } from "~/api/records/life-event/library/life-event-kind"
import { OpenDateInterval } from "~/utils/date/library/intervals"

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
