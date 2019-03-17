import { UUID } from "~/components/common/library/uuid"

export interface CockpitEntry {

	_id: UUID
	_by: UUID|undefined
	_mby: UUID|undefined
	_created: number|undefined
	_modified: number|undefined
	
}