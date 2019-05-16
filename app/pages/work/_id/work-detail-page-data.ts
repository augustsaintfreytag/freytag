import { Work } from "~/components/common/storage/models/work-item"
import { Content } from "~/components/common/storage/models/content-block"
import { PageData } from "~/components/common/pages/library/page-data"

export interface WorkDetailPageData extends PageData {

	types: {
		Form: {[key: string]: Content.Form}
	},

	workItemId: string|undefined
	workItem: Work.Item|undefined

}