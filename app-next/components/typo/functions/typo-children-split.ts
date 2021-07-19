import { ReactNode } from "react-markdown"

export function splitChildren(children: ReactNode[]): [ReactNode[], ReactNode | undefined] {
	const pivot = Math.max(0, children.length - 1)
	const leftChildren = children.slice(0, pivot)
	const lastChild = children[children.length - 1]

	return [leftChildren, lastChild]
}
