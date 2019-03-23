import { LifePageMapper } from "./life-page-mapper"
import { Vita } from "~/components/common/storage/models/vita-event"

type Data = Record<string, any>

export interface LifePageData extends Data {

	lifeFilter: string|undefined
	lifeSortingMode: LifePageMapper.SortingMode
	lifeSortingIsReversed: boolean

	unsortedLifeEvents: Vita.Event[]
	lifeEvents: Vita.Event[]

}