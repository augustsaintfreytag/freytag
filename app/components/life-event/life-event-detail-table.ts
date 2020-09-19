import { filteredRowsByNames, filteredRowsByValue, rowsFromEvent } from "@/components/life-event/functions/life-event-filter"
import { LifeEvent } from "@/utils/storage/models/life-event"
import { Component, Prop, Vue } from "vue-property-decorator"

export type LifeEventDetailRow = {
	name: string
	value: string|undefined	
}

@Component({})
export default class LifeEventDetailTable extends Vue {

	@Prop() lifeEvent!: LifeEvent
	@Prop() rowNames!: string[]
	@Prop() showsEmptyRows!: boolean

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