
import { Head } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	layout: "maintenance",

	head() {
		return Head.modeled({
			title: Head.Form.suffixedTitle("Maintenance")
		})
	}
})
export default class MaintenancePage extends Vue {}