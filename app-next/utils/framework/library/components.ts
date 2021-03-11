import { FunctionComponent, ReactNode, ReactNodeArray, ReactText } from "react"

export type PropsWithAnyChildren = { children: ReactNode | ReactNodeArray }
export type PropsWithAnyTextChildren = { children: ReactText }

export type TextFunctionComponent = FunctionComponent<PropsWithAnyTextChildren>
