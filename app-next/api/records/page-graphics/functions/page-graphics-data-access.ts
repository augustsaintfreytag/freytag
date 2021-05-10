import { CockpitDataAccess } from "cockpit-access"
import { ApiSingleton } from "~/api/common/functions/data-access"
import { PageGraphics } from "~/api/records/page-graphics/library/page-graphics"

export async function pageGraphicsFromApi(): Promise<PageGraphics | undefined> {
	const response = (await CockpitDataAccess.singletonRecord(ApiSingleton.PageGraphics)) as PageGraphics | undefined
	return response
}
