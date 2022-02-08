import { CockpitDateConversion, CockpitRecord } from "cockpit-access"
import { DateInterval, OpenDateInterval } from "~/utils/date/library/intervals"

export function dateFromTimestamp(timestamp: number): Date {
	return new Date(timestamp * 1000)
}

function dateFromString(value: string): Date | undefined {
	const date = CockpitDateConversion.dateFromString(value)

	if (!date?.valueOf()) {
		return undefined
	}

	return date
}

export function intervalFromFragment(fragment: { dateStarted: string; dateEnded: string }): DateInterval | OpenDateInterval | undefined {
	const startDate = dateFromString(fragment.dateStarted)
	const endDate = dateFromString(fragment.dateEnded)

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

export function datesFromRecord(record: CockpitRecord): { dateCreated?: Date; dateModified?: Date } {
	let dates: { dateCreated?: Date; dateModified?: Date } = {}

	if (record._created) {
		dates.dateCreated = dateFromTimestamp(record._created)
	}

	if (record._modified) {
		dates.dateModified = dateFromTimestamp(record._modified)
	}

	return dates
}
