import { CockpitRecord } from "cockpit-access"
import { WorkShowcase } from "~/api/cockpit/records/work-showcase/library/work-showcase"

export type WorkShowcaseFeature = CockpitRecord & {
	work?: WorkShowcase
}
