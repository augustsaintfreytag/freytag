import { FunctionComponent } from "react"
import { contentAnchorIdFromText } from "~/components/content-anchor/functions/content-anchor-form"
import styles from "./work-content-heading-block.module.sass"

export interface Props {
	text: string
}

const WorkContentHeadingBlock: FunctionComponent<Props> = props => {
	const anchorId = contentAnchorIdFromText(props.text)

	return (
		<section className={styles.block} id={anchorId}>
			<h2>{props.text}</h2>
		</section>
	)
}

export default WorkContentHeadingBlock
