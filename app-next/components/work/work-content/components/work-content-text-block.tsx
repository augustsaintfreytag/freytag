import { FunctionComponent } from "react"
import ArticleMarkdown from "~/components/markdown/article-markdown"
import { PropsWithAnyTextChildren } from "~/types/props"
import styles from "./work-content-text-block.module.sass"

export interface Props extends PropsWithAnyTextChildren {
	text?: string
}

const WorkContentTextBlock: FunctionComponent<Props> = props => {
	const content = props.text ?? String(props.children) ?? ""
	return <section className={styles.block}>{content && <ArticleMarkdown>{content}</ArticleMarkdown>}</section>
}

export default WorkContentTextBlock
