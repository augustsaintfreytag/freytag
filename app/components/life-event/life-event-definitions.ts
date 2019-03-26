import { Vita } from "../common/storage/models/vita-event"
import { DateFormatter } from "../common/storage/providers/date-formatter"

export namespace LifeEventDefinitions {

	export function detailRows(lifeEvent: Vita.Event) {
		return [
			{name: "Title", value: lifeEvent.name},
			{name: "Span", value: DateFormatter.formattedDateRange(lifeEvent)},
			{name: "Kind", value: lifeEvent.kind},
			{name: "Format", value: lifeEvent.format},
			{name: "Role", value: lifeEvent.role},
			{name: "Context", value: lifeEvent.context}
		]
	}

}