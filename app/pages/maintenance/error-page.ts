import { head, suffixedTitle } from "@/utils/head/head"
import { Component, Vue } from "vue-property-decorator"

@Component({
	layout: "maintenance",

	head() {
		return head({
			title: suffixedTitle("Maintenance")
		})
	}
})
export default class MaintenancePage extends Vue {}