import ContactBlockComponent from "@/components/contact-block/contact-block.vue"
import { head, suffixedTitle } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		ContactBlockComponent
	},

	head() {
		return head({
			title: suffixedTitle("Imprint")
		})
	}
})
export default class ImprintPage extends Vue {}