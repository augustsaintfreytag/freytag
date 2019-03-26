import { Component, Vue } from "vue-property-decorator"
import { LifeEventDefinitions } from "./life-event-definitions"

@Component({
	props: ["lifeEvent"],

	computed: {
		detailRows() {
			const event = this.$props.lifeEvent
			if (!event) {
				return []
			}

			return LifeEventDefinitions.detailRows(event)
		}
	}
})
export default class LifeEventDetailTableComponent extends Vue {}