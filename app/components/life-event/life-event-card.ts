import { Component, Vue, Prop } from "vue-property-decorator"
import LifeEventDetailTableComponent from "~/components/life-event/life-event-detail-table.vue"
import { Vita } from "../common/storage/models/vita-event"
import { TruncatedTextProvider } from "../common/truncated-text/truncated-text-provider"
import { UUID } from "../common/library/uuid"
import { TraversingItemSet } from "../common/storage/library/traversing-item-set"

const maxNavigationTextLength = 22

@Component({
	components: {
		LifeEventDetailTableComponent
	}
})
export default class LifeEventCardComponent extends Vue {

	// Data

	@Prop() lifeEventSet!: TraversingItemSet<Vita.Event>

	requestLifeEvent(id: UUID) {
		if (!id) {
			console.error("Requested life event without an identifier, can not present.")
			return
		}
		
		this.$emit("requestLifeEvent", id)
	}

	truncated(input: string): string {
		return TruncatedTextProvider.truncated(input, maxNavigationTextLength)
	}

	// Set Items

	get lifeEvent(): Vita.Event {
		return this.lifeEventSet.current
	}

	get nextLifeEvent(): Vita.Event|undefined {
		return this.lifeEventSet.next
	}

	get previousLifeEvent(): Vita.Event|undefined {
		return this.lifeEventSet.previous
	}

}