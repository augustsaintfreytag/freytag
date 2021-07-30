import { FunctionComponent } from "react"
import ArticleMarkdown from "~/components/markdown/article-markdown"
import styles from "./work-content-text-block.module.sass"

export interface Props {
	text?: string
}

const WorkContentTextBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>{props.text && <ArticleMarkdown>{props.text}</ArticleMarkdown>}</section>
)

export default WorkContentTextBlock
