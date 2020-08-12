import LifeEventDetailTableComponent from "@/components/life-event/life-event-detail-table.vue"
import { UUID } from "@/utils/common/library/uuid"
import { TraversingItemSet } from "@/utils/storage/library/traversing-item-set"
import { Vita } from "@/utils/storage/models/vita-event"
import { TruncatedTextProvider } from "@/utils/truncated-text/truncated-text-provider"
import { Component, Prop, Vue } from "vue-property-decorator"

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