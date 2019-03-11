
import { Vita } from "~/components/common/cockpit/models/vita-event"
import { LifePageMapper } from "./life-page-mapper"

type Data = Record<string, any>

export interface LifePageData extends Data {

	lifeSortingMode: LifePageMapper.SortingMode
	lifeSortingIsReversed: boolean

	unsortedLifeEvents: Vita.Event[]
	lifeEvents: Vita.Event[]

}