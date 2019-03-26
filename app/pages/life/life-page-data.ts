import { LifePageMapper } from "./life-page-mapper"
import { Vita } from "~/components/common/storage/models/vita-event"
import { PageData } from "~/components/common/pages/library/page-data"
import { UUID } from "~/components/common/library/uuid"
import { Index } from "~/components/common/library"

export interface LifePageData extends PageData {

	lifeFilter: string|undefined
	lifeSortingMode: LifePageMapper.SortingMode
	lifeSortingIsReversed: boolean
	lifeSelectedItemId: UUID|undefined,
	unsortedLifeEvents: Vita.Event[]
	lifeEvents: Vita.Event[],
	lifeEventIndexMap: {[key: string]: Index}

}