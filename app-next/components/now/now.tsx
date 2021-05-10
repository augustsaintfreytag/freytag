import { FunctionComponent, useState } from "react"
import { nowDisplayText } from "~/components/now/functions/now-formatting"
import { NowDisplayMode, nowDisplayModeCases } from "~/components/now/library/now-display-mode"
import { TextFunctionComponent } from "~/types/components"
import styles from "./now.module.sass"

// Functions

function nowDisplayMode(index: number): NowDisplayMode {
	return nowDisplayModeCases[index % nowDisplayModeCases.length]
}

// Decoration Components

const Surpassed: TextFunctionComponent = props => <span className={styles.surpassed}>{props.children}</span>

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
		<div className={styles.now}>
			<a onClick={onClickNowText}>
				<u>{nowText}</u>
			</a>
			<Surpassed>next year</Surpassed>
		</div>
	)
}

export default Now
