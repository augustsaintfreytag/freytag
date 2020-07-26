import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import HeaderBrandingComponent from "~/components/header/branding/branding.vue"
import { Head } from "~/components/common/head/head"
import { Landing } from "~/components/common/storage/models/landing"
import { CockpitDataProvider } from "~/components/common/cockpit/providers/cockpit-data-provider"

type IndexPageData = {
	graphic: Landing.Graphic|undefined,
	works: Landing.Works|undefined
}

@Component({
	layout: "landing",

	components: {
		HeaderComponent,
		HeaderBrandingComponent
	},

	async asyncData(): Promise<IndexPageData> {
		const graphic = await CockpitDataProvider.landingGraphic()
		const works = await CockpitDataProvider.landingWorks()

		return {
			graphic, works
		}
	},

	head() {
		return Head.modeled({
			meta: [
				{hid: "description", name: "description", content: "Personal portfolio and work showcase site of August Saint Freytag (A.S.F.), music video artist, filmmaker, concept designer, developer, analogue photographer. Presenting a selection of artwork, concepts, sketches and work in progress."}
			]
		})
	}
})
export default class IndexPage extends Vue {

	graphic: Landing.Graphic|undefined
	works: Landing.Works|undefined

}