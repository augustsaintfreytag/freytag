import { Component, Vue } from "vue-property-decorator"

interface Data {
	primaryTitle: string
	primaryOccupations: string
}

function brandingOccupations(): string[] {
	return ["Developer", "Music Video Artist", "Editor", "Concept Designer", "Analogue Photographer"]
}

@Component({
	data(): Data {
		return {
			primaryTitle: "August Saint Freytag",
			primaryOccupations: brandingOccupations().map(value => value.replace(" ", "&nbsp;")).join(" ・ ")
		}
	}
})
export default class HeaderBrandingComponent extends Vue implements Data {

	primaryTitle!: string
	primaryOccupations!: string

}