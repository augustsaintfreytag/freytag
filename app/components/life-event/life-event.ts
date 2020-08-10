import { Vita } from "@/utils/storage/models/vita-event"
import { DateFormatter } from "@/utils/storage/providers/date-formatter"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class LifeEventComponent extends Vue {

	@Prop() lifeEvent!: Vita.Event

	get formattedDateRange(): string {
		return DateFormatter.formattedDateRange(this.lifeEvent)
	}

}