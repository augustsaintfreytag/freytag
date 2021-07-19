import { Children, FunctionComponent } from "react"
import { TypoFragment } from "~/components/typo/typo-fragment"
import { PropsWithAnyChildren } from "~/types/props"

// Component

interface Props extends PropsWithAnyChildren {}

const Typo: FunctionComponent<Props> = props => {
	const numberOfChildren = Children.count(props.children)

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
