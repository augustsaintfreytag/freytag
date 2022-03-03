import { DateInterval, OpenDateInterval } from "~/utils/date/library/intervals"

// Library

const intervalRangeSymbol = "–"

export enum DateFormatStyle {
	MonthAndYear,
	DayMonthAndYear,
	DayMonthYearAndTime
}

// Formatting

export function formattedDateInterval(interval: DateInterval): string {
	const startComponent = formattedDate(interval.start)
	const endComponent = formattedDate(interval.end)

	if (startComponent === endComponent) {
		return endComponent
	}

	return `${startComponent} ${intervalRangeSymbol} ${endComponent}`
}

export function formattedOpenDateInterval(interval: OpenDateInterval): string {
	const startComponent = interval.start && formattedDate(interval.start)
	const endComponent = interval.end && formattedDate(interval.end)

	if (startComponent && endComponent) {
		if (startComponent === endComponent) {
			return endComponent
		}

		return `${startComponent} ${intervalRangeSymbol} ${endComponent}`
	} else if (startComponent && !endComponent) {
		return `${startComponent} ${intervalRangeSymbol} PRS.`
	} else if (endComponent) {
		return endComponent
	}

	return ""
}

export function formattedDate(date: Date, style: DateFormatStyle = DateFormatStyle.MonthAndYear): string {
	const monthAndYear = () => `${formattedComponent(date.getMonth() + 1)}/${date.getFullYear()}`
	const dayMonthAndYear = () => `${formattedComponent(date.getDate())}/${monthAndYear()}`
	const dayMonthYearAndTime = () => `${dayMonthAndYear()} ${formattedComponent(date.getHours())}:${formattedComponent(date.getMinutes())}`

	switch (style) {
		case DateFormatStyle.MonthAndYear:
			return monthAndYear()
		case DateFormatStyle.DayMonthAndYear:
			return dayMonthAndYear()
		case DateFormatStyle.DayMonthYearAndTime:
			return dayMonthYearAndTime()
	}
}

function formattedComponent(component: number): string {
	return component < 10 ? "0" + component : String(component)
}
