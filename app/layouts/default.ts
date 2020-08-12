import FooterComponent from "@/components/footer/footer.vue"
import HeaderComponent from "@/components/header/header.vue"
import SpriteSet from "@/components/sprite-set/sprite-set.vue"
import { Head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		HeaderComponent,
		FooterComponent,
		SpriteSet
	},

	head() {
		return Head.modeled()
	}
})
export default class DefaultLayout extends Vue {}