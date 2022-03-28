import { ReactElement, ReactNode, ReactNodeArray, ReactPortal, ReactText } from "react"
import { URL } from "~/utils/routing/library/url"

export type AnyChild =
	| string
	| number
	| boolean
	| {}
	| ReactElement<any, string | React.JSXElementConstructor<any>>
	| ReactNodeArray
	| ReactPortal
	| null
	| undefined

export type PropsWithAnyChildren = { children?: ReactNode | ReactNode[] }
export type PropsWithAnyTextChildren = { children?: ReactText }
export type PropsWithClassName = { className?: string }
export type PropsWithHref = { href: URL }
