import { FunctionComponent } from "react"
import ArticleMarkdown from "~/components/markdown/article-markdown"
import { PropsWithAnyTextChildren, PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./text-block.module.sass"

export interface Props extends PropsWithClassName, PropsWithAnyTextChildren {
	text?: string
}

function stringFromProps(props: Props): string | undefined {
	if (props.text) {
		return props.text
	}

	if (props.children) {
		return String(props.children)
	}

	return undefined
}

const TextBlock: FunctionComponent<Props> = props => {
	const content = stringFromProps(props)
	return <div className={className(styles.block, props.className)}>{content && <ArticleMarkdown>{content}</ArticleMarkdown>}</div>
}

export default TextBlock
