import { LifeEventKind } from "~/api/cockpit/records/life-event/library/life-event-kind"

export const LifeTableFilterKindAll = "All"

export type LifeTableFilterKind = LifeEventKind | typeof LifeTableFilterKindAll
