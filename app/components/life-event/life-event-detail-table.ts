import { filteredRowsByNames, filteredRowsByValue, rowsFromEvent } from "@/components/life-event/functions/life-event-filter"
import { Vita } from "@/utils/storage/models/vita-event"
import { Component, Prop, Vue } from "vue-property-decorator"

export type LifeEventDetailRow = {
	name: string
	value: string|undefined	
}

@Component({})
export default class LifeEventDetailTableComponent extends Vue {

	@Prop() lifeEvent!: Vita.Event
	@Prop() rowNames!: string[]
	@Prop() showsEmptyRows: boolean = false

	get detailRows(): LifeEventDetailRow[] {
		const event = this.lifeEvent
		
		if (!event) {
			return []
		}
		
		let rows: LifeEventDetailRow[] = rowsFromEvent(event)
		
		if (!this.$props.showsEmptyRows) {
			rows = filteredRowsByValue(rows)
		}
		
		rows = filteredRowsByNames(rows, this.rowNames)

		return rows
	}

}