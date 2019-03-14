import { UUID } from "~/components/common/library/uuid"

export interface CockpitEntry {
	_id: UUID
	_by: UUID
	_mby: UUID
	_created: number
	_modified: number
}