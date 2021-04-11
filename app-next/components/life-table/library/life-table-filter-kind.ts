import { LifeEventKind } from "~/utils/api/life-event/library/life-event-kind"

export const LifeEventKindAll = "All"

export type FilterKind = LifeEventKind | typeof LifeEventKindAll
