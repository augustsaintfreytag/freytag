import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/configuration/head"
import HeaderNavigationComponent from "~/components/header/navigation/navigation.vue"

@Component({
	components: {
		HeaderNavigationComponent
	},

	head() {
		return Head.modeled()
	}
})
export default class LandingLayout extends Vue {}