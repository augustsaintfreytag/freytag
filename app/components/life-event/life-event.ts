import { Component, Vue } from "vue-property-decorator"
import { Vita } from "../common/storage/models/vita-event"
import { DateFormatter } from "../common/storage/providers/date-formatter"

@Component({
	props: ["lifeEvent"]
})
export default class LifeEventComponent extends Vue {

	formattedDateRange(event: Vita.Event): string {
		return DateFormatter.formattedDateRange(event)
	}

}