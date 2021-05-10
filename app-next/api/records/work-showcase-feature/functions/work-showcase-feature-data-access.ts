import { CockpitDataAccess } from "cockpit-access"
import { ApiSingleton } from "~/api/common/functions/data-access"
import { WorkShowcaseFeature } from "~/api/records/work-showcase-feature/library/work-showcase-feature"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"

export async function featuredWordShowcaseFromApi(): Promise<WorkShowcase | undefined> {
	const response = (await CockpitDataAccess.singletonRecord(ApiSingleton.ShowcaseFeature)) as WorkShowcaseFeature | undefined
	return response?.work
}
