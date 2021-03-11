import { FunctionComponent, useState } from "react"

// Library

enum NowDisplayMode {
	Now,
	Today,
	Year,
	NextHour
}

const nowDisplayModeCases = [
	NowDisplayMode.Now,
	NowDisplayMode.Year,
	NowDisplayMode.NextHour,
	NowDisplayMode.Today
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
	const [nowText, updateNowText] = useState<string>(nowDisplayText(nowDisplayModeIndex))

	const onClickNowText = () => {
		const updatedIndex = (nowDisplayModeIndex + 1) % nowDisplayModeCases.length
		updateNowDisplayModeIndex(updatedIndex)
		updateNowText(nowDisplayText(updatedIndex))
	}
	return (
		<a onClick={onClickNowText}>
			<u>{nowText}</u>
		</a>
	)
}

export default Now
