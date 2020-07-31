import { Component, Vue, Prop } from "vue-property-decorator"
import { Vita } from "../common/storage/models/vita-event"
import { DateFormatter } from "../common/storage/providers/date-formatter"

@Component
export default class LifeEventComponent extends Vue {

	@Prop() lifeEvent!: Vita.Event

	get formattedDateRange(): string {
		return DateFormatter.formattedDateRange(this.lifeEvent)
	}

}