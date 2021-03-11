import { FunctionComponent, useState } from "react"
import { nowDisplayText } from "~/components/now/functions/now-formatting"
import { NowDisplayMode, nowDisplayModeCases } from "~/components/now/library/now-display-mode"

// Functions

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
