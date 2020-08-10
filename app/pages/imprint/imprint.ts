import ContactBlockComponent from "@/components/contact-block/contact-block.vue"
import { Head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	components: {
		ContactBlockComponent
	},

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Imprint")
		})
	}
})
export default class ImprintPage extends Vue {}