import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import HeaderBrandingComponent from "~/components/header/branding/branding.vue"

@Component({
	layout: "landing",
	components: {
		HeaderComponent,
		HeaderBrandingComponent
	}
})
export default class IndexPage extends Vue {}