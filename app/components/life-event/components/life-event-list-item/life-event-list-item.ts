import { formattedDateRange } from "@/components/life-event/functions/life-event-date-formatter"
import { LifeEvent } from "@/utils/storage/models/life-event"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({})
export default class LifeEventListItem extends Vue {

	@Prop() lifeEvent!: LifeEvent

	get formattedDateRange(): string {
		return formattedDateRange(this.lifeEvent)
	}

}