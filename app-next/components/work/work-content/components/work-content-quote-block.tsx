import { FunctionComponent } from "react"
import QuoteMarkdown from "~/components/markdown/quote-markdown"
import styles from "./work-content-quote-block.module.sass"

export interface Props {
	text?: string
}

const WorkContentQuoteBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<QuoteMarkdown>{props.text}</QuoteMarkdown>
	</section>
)

export default WorkContentQuoteBlock
