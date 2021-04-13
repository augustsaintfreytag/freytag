import { CockpitDateConversion } from "cockpit-access"
import { DateInterval, OpenDateInterval } from "~/utils/date/library/intervals"

export function intervalFromFragment(fragment: { dateStarted: string; dateEnded: string }): DateInterval | OpenDateInterval | undefined {
	const startDate = CockpitDateConversion.dateFromString(fragment.dateStarted)
	const endDate = CockpitDateConversion.dateFromString(fragment.dateEnded)

	if (startDate && endDate) {
		return {
			start: startDate,
			end: endDate
		}
	}

	if (startDate) {
		return { start: startDate }
	}

	if (endDate) {
		return { end: endDate }
	}

	return undefined
}
