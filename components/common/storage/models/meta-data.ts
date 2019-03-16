import { UUID } from "../../library/uuid"
import { Conversion } from "../../cockpit/providers/conversion"
import { CockpitEntry } from "../../cockpit/models/cockpit-entry"

export default class MetaData {
	
	id: UUID
	
	creator: UUID|undefined
	editor: UUID|undefined

	created: Date|undefined
	modified: Date|undefined

	constructor(entry: CockpitEntry) {
		this.id = entry._id
		this.creator = entry._by
		this.editor = entry._mby

		if (entry._created) {
			this.created = Conversion.dateFromTimestamp(entry._created)
		}

		if (entry._modified) {
			this.modified = Conversion.dateFromTimestamp(entry._modified)
		}
	}

}