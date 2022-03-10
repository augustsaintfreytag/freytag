import { FunctionComponent } from "react"
import QuotationMarkdown from "~/components/markdown/quotation-markdown"
import styles from "./work-content-quote-block.module.sass"

export interface Props {
	text?: string
}

const WorkContentQuoteBlock: FunctionComponent<Props> = props => (
	<div className={styles.block}>
		<QuotationMarkdown>{props.text}</QuotationMarkdown>
	</div>
)

export default WorkContentQuoteBlock
