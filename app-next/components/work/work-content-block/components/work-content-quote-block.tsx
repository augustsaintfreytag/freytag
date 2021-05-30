import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import styles from "./work-content-quote-block.module.sass"

type Props = {
	text?: string
}

const WorkContentQuoteBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<Markdown>{props.text}</Markdown>
	</section>
)

export default WorkContentQuoteBlock
