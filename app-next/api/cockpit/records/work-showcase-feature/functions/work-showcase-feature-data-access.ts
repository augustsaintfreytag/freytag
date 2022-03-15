import { CockpitDataAccess } from "cockpit-access"
import { CockpitSingleton } from "~/api/cockpit/data/library/data-access"
import { WorkShowcaseFeature } from "~/api/cockpit/records/work-showcase-feature/library/work-showcase-feature"
import { WorkShowcase } from "~/api/cockpit/records/work-showcase/library/work-showcase"

export async function featuredWorkShowcaseFromApi(): Promise<WorkShowcase | undefined> {
	const response = (await CockpitDataAccess.singletonRecord(CockpitSingleton.ShowcaseFeature)) as WorkShowcaseFeature | undefined
	return response?.work
}
