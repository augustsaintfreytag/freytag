import { ReactNode, ReactNodeArray, ReactText } from "react"
import { URL } from "~/utils/routing/library/url"

export type AnyChild =
	| string
	| number
	| boolean
	| {}
	| React.ReactElement<any, string | React.JSXElementConstructor<any>>
	| React.ReactNodeArray
	| React.ReactPortal
	| null
	| undefined

export type PropsWithAnyChildren = { children?: ReactNode | ReactNodeArray }
export type PropsWithAnyTextChildren = { children?: ReactText }
export type PropsWithClassName = { className?: string }
export type PropsWithHref = { href: URL }
