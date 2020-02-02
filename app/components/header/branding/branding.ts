import { Component, Vue } from "vue-property-decorator"

@Component({
	data() {
		return {
			content: {
				headerPrimaryTitle: "August Saint Freytag",
				headerPrimaryOccupations: ["Developer", "Music Video Artist", "Editor", "Concept Designer", "Analogue Photographer"].join(" ・ ")
			}
		}
	}
})
export default class HeaderBrandingComponent extends Vue {}