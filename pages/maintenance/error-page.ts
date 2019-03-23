import { Component, Vue } from "vue-property-decorator"
import { Head } from "~/components/common/head/head"

@Component({
	layout: "maintenance",

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Maintenance")
		})
	}
})
export default class MaintenancePage extends Vue {}