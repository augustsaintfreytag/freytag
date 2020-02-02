import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import HeaderBrandingComponent from "~/components/header/branding/branding.vue"
import { IndexData } from "./index-data"
import { IndexPageMapper } from "./index-page-mapper"
import { Head } from "~/components/common/head/head"

@Component({
	layout: "landing",

	components: {
		HeaderComponent,
		HeaderBrandingComponent
	},

	async asyncData() {
		const initialData: IndexData = {
			graphic: undefined,
			works: undefined
		}
		
		await IndexPageMapper.mapLandingGraphic(initialData)
		await IndexPageMapper.mapLandingWorks(initialData)

		return initialData
	},

	head() {
		return Head.modeled({
			meta: [
				{hid: "description", name: "description", content: "Personal portfolio and work showcase site of August Saint Freytag (A.S.F.), music video artist, filmmaker, concept designer, developer, analogue photographer. Presenting a selection of artwork, concepts, sketches and work in progress."}
			]
		})
	}
})
export default class IndexPage extends Vue {}