import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import { IndexData } from "./index-data"

export namespace IndexPageMapper {

	export async function mapLandingGraphic(data: IndexData) {
		try {
			const landingGraphic = await CockpitDataProvider.landingGraphic()
			data.graphic = landingGraphic
		} catch (error) {
			console.error("Could not get landing graphic.", error)
		}
	}

	export async function mapLandingWorks(data: IndexData) {
		try {
			const landingWorks = await CockpitDataProvider.landingWorks()
			data.works = landingWorks
		} catch (error) {
			console.error("Could not get landing works.", error)
		}
	}

}