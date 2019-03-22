import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/head/head"

@Component({

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Imprint")
		})
	}

})
export default class ImprintPage extends Vue {}