import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import HeaderBrandingComponent from "~/components/header/branding/branding.vue"
import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"
import { IndexData } from "./index-data"

const data: IndexData = {
	graphic: undefined,
	works: undefined
}

namespace IndexPageMapper {

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

@Component({
	layout: "landing",

	components: {
		HeaderComponent,
		HeaderBrandingComponent
	},

	data() {
		return data
	},

	async asyncData() {
		await IndexPageMapper.mapLandingGraphic(data)
		await IndexPageMapper.mapLandingWorks(data)

		return data
	}
})
export default class IndexPage extends Vue {}