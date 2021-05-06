import { intervalFromFragment } from "~/api/common/functions/date-conversion"
import { LifeEvent } from "~/api/records/life-event/library/life-event"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"

export function lifeTableItemDataFromEvents(lifeEvents: LifeEvent[]): LifeTableItemData[] {
	return lifeEvents.reduce((items: LifeTableItemData[], lifeEvent: LifeEvent) => {
		const name = lifeEvent.name
		const interval = intervalFromFragment(lifeEvent)

		if (!name || !interval) {
			return items
		}

		const item: LifeTableItemData = {
			name: name,
			kind: lifeEvent.kind as LifeEventKind,
			interval: interval,
			format: lifeEvent.format,
			role: lifeEvent.role
		}

		if (lifeEvent.context) {
			item.context = lifeEvent.context
		}

		if (lifeEvent.description) {
			item.description = lifeEvent.description
		}

		items.push(item)
		return items
	}, [])
}
