import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import HeaderBrandingComponent from "~/components/header/branding/branding.vue"
import { IndexData } from "./index-data"
import { IndexPageMapper } from "./index-page-mapper"

const data: IndexData = {
	graphic: undefined,
	works: undefined
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