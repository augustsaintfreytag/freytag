import { LifePageMapper } from "./life-page-mapper"
import { Vita } from "~/components/common/storage/models/vita-event"
import { PageData } from "~/components/common/pages/library/page-data"

export interface LifePageData extends PageData {

	lifeFilter: string|undefined
	lifeSortingMode: LifePageMapper.SortingMode
	lifeSortingIsReversed: boolean

	unsortedLifeEvents: Vita.Event[]
	lifeEvents: Vita.Event[]

}