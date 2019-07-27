import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/head/head"
import ContactBlockComponent from "~/components/contact-block/contact-block.vue"

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