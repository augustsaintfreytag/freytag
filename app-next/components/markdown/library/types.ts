import { ElementType } from "react"
import { ReactBaseProps, ReactMarkdownProps } from "react-markdown/src/ast-to-react"
import { Dictionary } from "~/utils/types/library/dictionary"

export type MarkdownComponentArgs = ReactBaseProps & ReactMarkdownProps
export type MarkdownComponents = Dictionary<string, ElementType>
