import { CockpitDataAccess } from "cockpit-access"
import { CockpitSingleton } from "~/api/cockpit/data/library/data-access"
import { PageGraphics } from "~/api/cockpit/records/page-graphics/library/page-graphics"

export async function pageGraphicsFromApi(): Promise<PageGraphics | undefined> {
	const response = (await CockpitDataAccess.singletonRecord(CockpitSingleton.PageGraphics)) as PageGraphics | undefined
	return response
}
