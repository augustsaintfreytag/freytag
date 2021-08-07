import { FunctionComponent } from "react"
import { joinSplitWords, splitWords } from "~/components/typo/functions/typo-word-split"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./typo.module.sass"

interface Props {
	text: string
}

export const NonWrappingTypoFragment: FunctionComponent<PropsWithAnyChildren> = props => {
	return <span className={styles.wrap}>{props.children}</span>
}

export const TypoFragment: FunctionComponent<Props> = props => {
	const { text } = props
	const [leftWords, rightWords] = splitWords(text)
	const joinedLeftWords = joinSplitWords(leftWords, true)
	const joinedRightWords = joinSplitWords(rightWords, false)

	return (
		<>
			<>{joinedLeftWords}</>
			{joinedRightWords && <NonWrappingTypoFragment>{joinedRightWords}</NonWrappingTypoFragment>}
		</>
	)
}
