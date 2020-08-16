import FooterComponent from "@/components/footer/footer.vue"
import HeaderComponent from "@/components/header/header.vue"
import SpriteSet from "@/components/sprite-set/sprite-set.vue"
import { head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		HeaderComponent,
		FooterComponent,
		SpriteSet
	},

	head() {
		return head()
	}
})
export default class DefaultLayout extends Vue {}