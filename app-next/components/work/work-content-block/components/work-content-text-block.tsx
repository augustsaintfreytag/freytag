import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import styles from "./work-content-text-block.module.sass"

export interface Props {
	text?: string
}

const WorkContentTextBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>{props.text && <Markdown>{props.text}</Markdown>}</section>
)

export default WorkContentTextBlock
