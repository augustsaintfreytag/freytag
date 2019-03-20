import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/configuration/head"
import HeaderNavigationComponent from "~/components/header/navigation/navigation.vue"
import FooterComponent from "~/components/footer/footer.vue"
import SpriteSet from "~/components/sprite-set/sprite-set.vue"

@Component({
	components: {
		HeaderNavigationComponent,
		FooterComponent,
		SpriteSet
	},

	head() {
		return Head.modeled()
	}
})
export default class LandingLayout extends Vue {}