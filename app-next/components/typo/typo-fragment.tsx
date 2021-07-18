import { FunctionComponent } from "react"
import { splitWords } from "~/components/typo/functions/typo-word-split"

interface Props {
	text: string
}

const TypoFragment: FunctionComponent<Props> = props => {
	const { text } = props
	const [leftWords, rightWords, hasLeftWords, hasRightWords] = splitWords(text)

	return (
		<>
			<>{leftWords.join(" ")}</>
			{hasLeftWords && <> </>}
			<span style={{ backgroundColor: "yellow", hyphens: "none", whiteSpace: "nowrap" }}>{rightWords.join(" ")}</span>
		</>
	)
}

export default TypoFragment
