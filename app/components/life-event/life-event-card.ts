import { Component, Vue } from "vue-property-decorator"
import LifeEventDetailTableComponent from "~/components/life-event/life-event-detail-table.vue"
import { TruncatedTextProvider } from "../common/truncated-text/truncated-text-provider"
import { UUID } from "../common/library/uuid"
import { Vita } from "../common/storage/models/vita-event"

const maxNavigationTextLength = 22

@Component({
	props: ["lifeEventSet"],

	components: {
		LifeEventDetailTableComponent
	},

	computed: {
		lifeEvent(): Vita.Event {
			return this.$props.lifeEventSet.current
		},

		nextLifeEvent(): Vita.Event|undefined {
			return this.$props.lifeEventSet.next
		},

		previousLifeEvent(): Vita.Event|undefined {
			return this.$props.lifeEventSet.previous
		}
	}
})
export default class LifeEventCardComponent extends Vue {

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

}