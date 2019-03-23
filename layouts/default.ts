import { Component, Vue } from "vue-property-decorator"
import HeaderComponent from "~/components/header/header.vue"
import FooterComponent from "~/components/footer/footer.vue"
import SpriteSet from "~/components/sprite-set/sprite-set.vue"
import { Head } from "~/components/common/head/head"

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