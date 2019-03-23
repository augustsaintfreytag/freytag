import { UUID } from "~/components/common/library/uuid"
import { ConversionProvider } from "~/components/common/cockpit/providers/conversion-provider"
import { CockpitEntry } from "~/components/common/cockpit/models/cockpit-entry"

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
			this.created = ConversionProvider.dateFromTimestamp(entry._created)
		}

		if (entry._modified) {
			this.modified = ConversionProvider.dateFromTimestamp(entry._modified)
		}
	}

}