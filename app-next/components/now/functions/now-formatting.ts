import { NowDisplayMode } from "~/components/now/library/now-display-mode"

// Data

const monthDescriptions: string[] = (() => {
	const date = new Date(0)
	const locale = "en-gb"
	const descriptions: string[] = []

	for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
		date.setMonth(monthIndex)
		const monthDescription = date.toLocaleString(locale, { month: "long" })
		descriptions.push(monthDescription)
	}

	return descriptions
})()

// Formatting

function formattedOrdinal(value: number): string {
	const digitString = String(value)
	const lastDigit = Number(digitString.substr(-1))
	const secondToLastDigit = digitString.length > 1 ? Number(digitString.substr(-2, 1)) : undefined

	if (secondToLastDigit === 1) {
		return `${value}th`
	}

	if (lastDigit === 1) {
		return `${value}st`
	}

	if (lastDigit === 2) {
		return `${value}nd`
	}

	if (lastDigit === 3) {
		return `${value}rd`
	}

	return `${value}th`
}

function formattedDateComponents(date: Date): { year: string; month: string; day: string } {
	return {
		year: date.getFullYear().toString(),
		month: (date.getMonth() + 1).toString().padStart(2, "0"),
		day: date.getDate().toString().padStart(2, "0")
	}
}

function formattedNextHour(date: Date): string {
	const currentHour = date.getHours()
	const nextHour = (currentHour + 1) % 24
	const formattedNextHour = nextHour.toString().padStart(2, "0")

	return `${formattedNextHour}:00`
}

export function nowDisplayText(mode: NowDisplayMode): string {
	const date = new Date()
	const { year, month, day } = formattedDateComponents(date)

	switch (mode) {
		case NowDisplayMode.Now:
			return "now"
		case NowDisplayMode.Today:
			return "today"
		case NowDisplayMode.Year:
			return `in ${date.getFullYear().toString()}`
		case NowDisplayMode.Date:
			return `on ${year}-${month}-${day}`
		case NowDisplayMode.NextHour:
			return `at ${formattedNextHour(date)}`
		case NowDisplayMode.DateLocalized:
			return `on ${monthDescriptions[date.getMonth()]} ${formattedOrdinal(date.getDate())}`
	}
}
