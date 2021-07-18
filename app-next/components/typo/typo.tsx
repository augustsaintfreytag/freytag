import { Children, FunctionComponent } from "react"
import { PropsWithAnyChildren } from "~/types/props"

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

function typoFragment(text: string): JSX.Element {
	const [leftWords, rightWords] = splitWords(text)

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

// Component

interface Props extends PropsWithAnyChildren {
	// children: string
}

const Typo: FunctionComponent<Props> = props => {
	const numberOfChildren = Children.count(props.children)

	return (
		<>
			{Children.map(props.children, (child, index) => {
				const isLastChild = index === numberOfChildren - 1

				if (!isLastChild || typeof child !== "string") {
					return child
				}

				return typoFragment(child)
			})}
		</>
	)
}

export default Typo
