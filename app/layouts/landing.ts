import FooterComponent from "@/components/footer/footer.vue"
import HeaderNavigationComponent from "@/components/header/navigation/navigation.vue"
import SpriteSet from "@/components/sprite-set/sprite-set.vue"
import { Head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

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