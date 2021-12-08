import { CockpitRecord } from "cockpit-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"

export type WorkShowcaseFeature = CockpitRecord & {
	work?: WorkShowcase
}
