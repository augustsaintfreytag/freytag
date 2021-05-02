import { DateInterval, OpenDateInterval } from "~/utils/date/library/intervals"

// Library

const intervalRangeSymbol = "–"

export enum DateFormatStyle {
	MonthAndYear,
	DayMonthAndYear
}

// Formatting

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

export function formattedDate(date: Date, style: DateFormatStyle = DateFormatStyle.MonthAndYear): string {
	switch (style) {
		case DateFormatStyle.MonthAndYear:
			return `${formattedComponent(date.getMonth() + 1)}/${date.getFullYear()}`
		case DateFormatStyle.DayMonthAndYear:
			return `${formattedComponent(date.getDate())}/${formattedComponent(date.getMonth() + 1)}/${date.getFullYear()}`
	}
}

function formattedComponent(component: number): string {
	return component < 10 ? "0" + component : String(component)
}
