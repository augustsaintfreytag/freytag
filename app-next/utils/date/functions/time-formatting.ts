// Library

import { TimeInterval } from "~/utils/date/library/intervals"
import { denominatorDescription } from "~/utils/description/functions/denominator-description"

export enum TimeFormatStyle {
	Days,
	Weeks
}

// Formatting

export function formattedTimeInterval(interval: TimeInterval, format: TimeFormatStyle = TimeFormatStyle.Days): string {
	switch (format) {
		case TimeFormatStyle.Days:
			return formattedNumberOfDaysFromInterval(interval)
		case TimeFormatStyle.Weeks:
			return formattedNumberOfWeeksFromInterval(interval)
	}
}

// Formats

function formattedNumberOfDaysFromInterval(interval: TimeInterval): string {
	const value = Math.ceil(interval / 1000 / 86400)
	return denominatorDescription({ singular: "day", plural: "days" }, value)
}

function formattedNumberOfWeeksFromInterval(interval: TimeInterval): string {
	const value = Math.ceil(interval / 1000 / 86400 / 7)
	return denominatorDescription({ singular: "week", plural: "weeks" }, value)
}
