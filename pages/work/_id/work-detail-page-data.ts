import { UUID } from "~/components/common/library/uuid"
import { Work } from "~/components/common/storage/models/work-item"
import { Content } from "~/components/common/storage/models/content-block"

export interface WorkDetailPageData {

	types: {
		Form: {[key: string]: Content.Form}
	},

	workItemId: UUID|undefined
	workItem: Work.Item|undefined

}