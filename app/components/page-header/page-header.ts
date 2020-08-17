import { Component, Vue } from "vue-property-decorator"
import PageHeaderBranding from "./components/branding/page-header-branding.vue"
import PageHeaderNavigation from "./components/navigation/page-header-navigation.vue"

@Component({
	components: {
		PageHeaderBranding,
		PageHeaderNavigation
	}
})
export default class PageHeader extends Vue {}