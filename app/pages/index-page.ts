import HeaderBrandingComponent from "@/components/header/branding/branding.vue"
import HeaderComponent from "@/components/header/header.vue"
import * as CockpitDataProvider from "@/utils/cockpit/functions/cockpit-data-provider"
import { head } from "@/utils/head/head"
import { Landing } from "@/utils/storage/models/landing"
import { Component, Vue } from "vue-property-decorator"

// Library

type Data = {
	graphic: Landing.Graphic|undefined,
	works: Landing.Works|undefined
}

// Component

@Component({
	layout: "landing",

	components: {
		HeaderComponent,
		HeaderBrandingComponent
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

	graphic: Landing.Graphic|undefined
	works: Landing.Works|undefined

}