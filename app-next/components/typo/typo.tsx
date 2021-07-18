import { FunctionComponent } from "react"

// Utility

function splitWords(text: string): [string[], string[]] {
	const words = text.split(" ")
	const pivot = Math.max(0, words.length - 2)
	const leftWords = words.slice(0, pivot)
	const rightWords = words.slice(pivot, words.length)

	return [leftWords, rightWords]
}

// Function

export function typo(text: string): string {
	const [leftWords, rightWords] = splitWords(text)
	return leftWords.join(" ") + " " + rightWords.join("&nbsp;")
}

// Component

interface Props {
	children: string
}

const Typo: FunctionComponent<Props> = props => {
	const [leftWords, rightWords] = splitWords(props.children)

	return (
		<>
			<>{leftWords.join(" ")}</>
			<>
				{rightWords.map(word => (
					<>&nbsp;{word}</>
				))}
			</>
		</>
	)
}

export default Typo
