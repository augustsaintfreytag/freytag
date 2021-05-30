import { CockpitEntry } from "cockpit-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"

export type WorkShowcaseFeature = CockpitEntry & {
	work?: WorkShowcase
}
