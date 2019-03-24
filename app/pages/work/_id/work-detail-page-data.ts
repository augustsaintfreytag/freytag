import { UUID } from "~/components/common/library/uuid"
import { Work } from "~/components/common/storage/models/work-item"
import { Content } from "~/components/common/storage/models/content-block"
import { PageData } from "~/components/common/library/page-data"

export interface WorkDetailPageData extends PageData {

	types: {
		Form: {[key: string]: Content.Form}
	},

	workItemId: UUID|undefined
	workItem: Work.Item|undefined

}