export type TimeInterval = number

export interface DateInterval {
	start: Date
	end: Date
}

export interface OpenDateInterval {
	start?: Date
	end?: Date
}

export const TimeIntervalValue = {
	Second: 1e3,
	Minute: 6e4,
	Hour: 36e5,
	Day: 864e5
}
