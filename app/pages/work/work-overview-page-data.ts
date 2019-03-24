import { Work } from "~/components/common/storage/models/work-item"
import { PageData } from "~/components/common/library/page-data"

export default interface WorkOverviewPageData extends PageData {

	workItems: Work.Item[]

}