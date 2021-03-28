import { DateInterval, OpenDateInterval } from "~/utils/date/library/intervals"

const intervalRangeSymbol = "–"

export function formattedDateInterval(interval: DateInterval): string {
	return `${formattedDate(interval.start)} ${intervalRangeSymbol} ${formattedDate(interval.end)}`
}

export function formattedOpenDateInterval(interval: OpenDateInterval): string {
	if (interval.start && interval.end) {
		return `${formattedDate(interval.start)} ${intervalRangeSymbol} ${formattedDate(interval.end)}`
	} else if (interval.start && !interval.end) {
		return `${formattedDate(interval.start)} ${intervalRangeSymbol} PRS.`
	} else if (interval.end) {
		return formattedDate(interval.end)
	}

	return ""
}

export function formattedDate(date: Date): string {
	return `${formattedMonth(date.getMonth() + 1)}/${date.getFullYear()}`
}

function formattedMonth(month: number): string {
	return month < 10 ? "0" + month : String(month)
}
