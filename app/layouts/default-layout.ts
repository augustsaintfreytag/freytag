import PageFooter from "@/components/page-footer/page-footer.vue"
import PageHeader from "@/components/page-header/page-header.vue"
import SpriteSet from "@/components/sprite-set/sprite-set.vue"
import { head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		PageHeader,
		PageFooter,
		SpriteSet
	},

	head() {
		return head()
	}
})
export default class DefaultLayout extends Vue {}