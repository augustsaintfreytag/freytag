import FooterComponent from "@/components/footer/footer.vue"
import HeaderNavigationComponent from "@/components/header/navigation/navigation.vue"
import SpriteSet from "@/components/sprite-set/sprite-set.vue"
import { head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		HeaderNavigationComponent,
		FooterComponent,
		SpriteSet
	},

	head() {
		return head()
	}
})
export default class LandingLayout extends Vue {}