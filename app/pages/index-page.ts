import PageHeaderBranding from "@/components/page-header/components/branding/page-header-branding.vue"
import PageHeader from "@/components/page-header/page-header.vue"
import * as CockpitDataProvider from "@/utils/cockpit/functions/cockpit-data-provider"
import { head } from "@/utils/head/head"
import { LandingGraphic, LandingWorks } from "@/utils/storage/models/landing"
import { Component, Vue } from "vue-property-decorator"

// Library

type Data = {
	graphic: LandingGraphic|undefined,
	works: LandingWorks|undefined
}

// Component

@Component({
	layout: "landing",

	components: {
		PageHeader,
		PageHeaderBranding
	},

	async asyncData(): Promise<Data> {
		const graphic = await CockpitDataProvider.landingGraphic()
		const works = await CockpitDataProvider.landingWorks()

		return {
			graphic, works
		}
	},

	head() {
		return head({
			meta: [
				{
					hid: "description", 
					name: "description", 
					content: [
						"Personal portfolio and work showcase site of August Saint Freytag (A.S.F.),", 
						"music video artist, filmmaker, concept designer, developer, analogue photographer.", 
						"Presenting a selection of artwork, concepts, sketches and work in progress."
					].join(" ")
				}
			]
		})
	}
})
export default class IndexPage extends Vue implements Data {

	graphic: LandingGraphic|undefined
	works: LandingWorks|undefined

}