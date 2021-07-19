import { Children, FunctionComponent } from "react"
import { NonWrappingTypoFragment, TypoFragment } from "~/components/typo/typo-fragment"
import { PropsWithAnyChildren } from "~/types/props"

/** The minimum number of characters a text-only child must have not to qualify as a stub. */
const stubCharacterThreshold = 5

// Component

interface Props extends PropsWithAnyChildren {}

const Typo: FunctionComponent<Props> = props => {
	const children = Children.toArray(props.children)
	const numberOfChildren = children.length
	const lastChild = children[numberOfChildren - 1]

	if (typeof lastChild === "string" && lastChild.length < stubCharacterThreshold) {
		const pivot = numberOfChildren - 2
		const leftChildren = children.slice(0, pivot)
		const rightChildren = children.slice(pivot, numberOfChildren)

		return (
			<>
				{leftChildren}
				<NonWrappingTypoFragment>{rightChildren}</NonWrappingTypoFragment>
			</>
		)
	}

	return (
		<>
			{Children.map(props.children, (child, index) => {
				const isLastChild = index === numberOfChildren - 1

				if (!isLastChild || typeof child !== "string") {
					return child
				}

				return <TypoFragment text={child} />
			})}
		</>
	)
}

export default Typo
