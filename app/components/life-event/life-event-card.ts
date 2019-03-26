import { Component, Vue } from "vue-property-decorator"
import LifeEventDetailTableComponent from "~/components/life-event/life-event-detail-table.vue"
import { TruncatedTextProvider } from "../common/truncated-text/truncated-text-provider"
import { Vita } from "../common/storage/models/vita-event"

const maxNavigationTextLength = 15

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

	truncated(input): string {
		return TruncatedTextProvider.truncated(input, maxNavigationTextLength)
	}

}