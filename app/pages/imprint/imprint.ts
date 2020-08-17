import ContactBlockComponent from "@/components/contact-block/contact-block.vue"
import { head, suffixedTitleForHead } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		ContactBlockComponent
	},

	head() {
		return head({
			title: suffixedTitleForHead("Imprint")
		})
	}
})
export default class ImprintPage extends Vue {}