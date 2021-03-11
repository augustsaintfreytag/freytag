import { FunctionComponent, useState } from "react"

// Library

enum NowDisplayMode {
	Now,
	Year,
	Date,
	NextHour,
	Today
}

const nowDisplayModeCases = [
	NowDisplayMode.Now,
	NowDisplayMode.Year,
	NowDisplayMode.NextHour,
	NowDisplayMode.Today,
	NowDisplayMode.Date
]

// Functions

function nowDisplayText(mode: NowDisplayMode): string {
	switch (mode) {
		case NowDisplayMode.Now:
			return "now"
		case NowDisplayMode.Today:
			return "today"
		case NowDisplayMode.Year:
			return new Date().getFullYear().toString()
		case NowDisplayMode.Date:
			const date = new Date()
			const dateComponents = {
				year: date.getFullYear().toString(),
				month: (date.getMonth() + 1).toString().padStart(2, "0"),
				date: date.getDate().toString().padStart(2, "0")
			}
			return `${dateComponents.year}-${dateComponents.month}-${dateComponents.date}`
		case NowDisplayMode.NextHour:
			const currentHour = new Date().getHours()
			const nextHour = (currentHour + 1) % 24
			const formattedNextHour = nextHour.toString().padStart(2, "0")

			return `${formattedNextHour}:00`
	}
}

function nowDisplayMode(index: number): NowDisplayMode {
	return nowDisplayModeCases[index % nowDisplayModeCases.length]
}

// Component

const Now: FunctionComponent = () => {
	const [nowDisplayModeIndex, updateNowDisplayModeIndex] = useState(0)
	const [nowText, updateNowText] = useState(nowDisplayText(nowDisplayModeIndex))

	const onClickNowText = () => {
		const updatedIndex = (nowDisplayModeIndex + 1) % nowDisplayModeCases.length
		const updatedMode = nowDisplayMode(updatedIndex)
		const updatedText = nowDisplayText(updatedMode)

		console.log(`Updating now text, set to index ${updatedIndex}, text '${updatedText}'.`)
		updateNowDisplayModeIndex(updatedIndex)
		updateNowText(updatedText)
	}
	return (
		<a onClick={onClickNowText}>
			<u>{nowText}</u>
		</a>
	)
}

export default Now
