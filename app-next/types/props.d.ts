import { ReactNode, ReactNodeArray, ReactText } from "react"
import { URL } from "~/utils/urls/library/url"

export type PropsWithAnyChildren = { children?: ReactNode | ReactNodeArray }
export type PropsWithAnyTextChildren = { children?: ReactText }
export type PropsWithHref = { href: URL }
