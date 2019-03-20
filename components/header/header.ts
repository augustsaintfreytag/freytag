import { Component, Vue } from "vue-property-decorator"
import HeaderBrandingComponent from "./branding/branding.vue"
import HeaderNavigationComponent from "./navigation/navigation.vue"

@Component({
	components: {
		HeaderBrandingComponent,
		HeaderNavigationComponent
	}
})
export default class HeaderComponent extends Vue {}