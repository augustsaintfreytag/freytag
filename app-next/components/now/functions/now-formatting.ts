import { NowDisplayMode } from "~/components/now/library/now-display-mode"

// Formatting

function formattedOrdinal(value: number): string {
	const lastDigit = String(value).substr(-1)

	switch (lastDigit) {
		case "1":
			return `${value}st`
		case "2":
			return `${value}nd`
		case "3":
			return `${value}rd`
		default:
			return `${value}th`
	}
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
	switch (mode) {
		case NowDisplayMode.Now:
			return "now"
		case NowDisplayMode.Today:
			return "today"
		case NowDisplayMode.Year:
			return new Date().getFullYear().toString()
		case NowDisplayMode.Date:
			const { year, month, day } = formattedDateComponents(new Date())
			return `on ${year}-${month}-${day}`
		case NowDisplayMode.NextHour:
			return `at ${formattedNextHour(new Date())}`
	}
}
