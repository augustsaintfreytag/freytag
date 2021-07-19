import { FunctionComponent } from "react"
import QuotationMarkdown from "~/components/markdown/quotation-markdown"
import styles from "./work-content-quote-block.module.sass"

export interface Props {
	text?: string
}

const WorkContentQuoteBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<QuotationMarkdown>{props.text}</QuotationMarkdown>
	</section>
)

export default WorkContentQuoteBlock
