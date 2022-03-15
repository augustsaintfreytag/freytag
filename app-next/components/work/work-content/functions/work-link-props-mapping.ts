import { intervalFromFragment } from "~/api/cockpit/data/functions/date-conversion"
import { LifeEventKind, lifeEventKindFromRawValue } from "~/api/cockpit/records/life-event/library/life-event-kind"
import { WorkShowcase } from "~/api/cockpit/records/work-showcase/library/work-showcase"
import { OpenDateInterval } from "~/utils/date/library/intervals"

// Link Props

interface LinkProperties {
	kind: LifeEventKind
	title: string
	interval: OpenDateInterval
	wantsReducedAppearance?: boolean
}

export function linkPropsForShowcase(showcase: WorkShowcase): LinkProperties | undefined {
	const event = showcase.event

	if (!event) {
		return undefined
	}

	const eventKind = lifeEventKindFromRawValue(event.kind)
	const eventInterval = intervalFromFragment(event)

	if (!eventKind || !eventInterval) {
		return undefined
	}

	return {
		kind: eventKind,
		title: event.name,
		interval: eventInterval,
		wantsReducedAppearance: showcase.reducedEventAppearance ?? false
	}
}
