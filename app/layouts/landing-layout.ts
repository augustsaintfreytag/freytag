import PageFooter from "@/components/page-footer/page-footer.vue"
import PageHeaderNavigation from "@/components/page-header/components/navigation/page-header-navigation.vue"
import SpriteSet from "@/components/sprite-set/sprite-set.vue"
import { head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		PageHeaderNavigation,
		PageFooter,
		SpriteSet
	},

	head() {
		return head()
	}
})
export default class LandingLayout extends Vue {}