import { LifeEventKind } from "~/utils/api/life-event/library/life-event-kind"

export const LifeTableFilterKindAll = "All"

export type LifeTableFilterKind = LifeEventKind | typeof LifeTableFilterKindAll
