import { Component, Vue } from "vue-property-decorator"

@Component({
	data() {
		return {
			content: {
				headerPrimaryTitle: "August S. Freytag",
				headerPrimaryOccupations: ["Music Video Artist", "Editor", "Concept Designer", "Developer", "Analogue Photographer"].join(" ・ ")
			}
		}
	}
})
export default class HeaderBrandingComponent extends Vue {}