import { LifeEventKind } from "~/utils/api/records/life-event/library/life-event-kind"

export const LifeTableFilterKindAll = "All"

export type LifeTableFilterKind = LifeEventKind | typeof LifeTableFilterKindAll
