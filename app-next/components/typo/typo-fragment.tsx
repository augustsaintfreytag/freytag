import { FunctionComponent } from "react"
import { joinSplitWords, splitWords } from "~/components/typo/functions/typo-word-split"
import styles from "./typo.module.sass"

interface Props {
	text: string
}

const TypoFragment: FunctionComponent<Props> = props => {
	const { text } = props
	const [leftWords, rightWords] = splitWords(text)
	const hasLeftWords = leftWords.length > 0

	return (
		<>
			<>{joinSplitWords(leftWords)}</>
			<span className={styles.wrap}>{rightWords.join(" ")}</span>
		</>
	)
}

export default TypoFragment
