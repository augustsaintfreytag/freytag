import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import HeaderBrandingComponent from "~/components/header/branding/branding.vue"
import { IndexData } from "./index-data"
import { IndexPageMapper } from "./index-page-mapper"
import { Head } from "~/components/common/head/head"

const initialData: IndexData = {
	graphic: undefined,
	works: undefined
}

@Component({
	layout: "landing",

	components: {
		HeaderComponent,
		HeaderBrandingComponent
	},

	async asyncData() {
		await IndexPageMapper.mapLandingGraphic(initialData)
		await IndexPageMapper.mapLandingWorks(initialData)

		return initialData
	},

	head() {
		return Head.modeled({
			meta: [
				{hid: "description", name: "description", content: "Personal portfolio and work showcase site of August S. Freytag, music video artist, filmmaker, concept designer, developer, analogue photographer. Presenting a selection of artwork, concepts, sketches and work in progress."}
			]
		})
	}
})
export default class IndexPage extends Vue {}