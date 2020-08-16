import { formattedDateRange } from "@/components/life-event/functions/vita-date-formatter"
import { Vita } from "@/utils/storage/models/vita-event"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class LifeEventComponent extends Vue {

	@Prop() lifeEvent!: Vita.Event

	get formattedDateRange(): string {
		return formattedDateRange(this.lifeEvent)
	}

}