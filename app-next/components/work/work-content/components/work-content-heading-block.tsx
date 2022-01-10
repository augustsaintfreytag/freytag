import { FunctionComponent } from "react"
import ContentAnchor from "~/components/content-anchor/components/content-anchor"
import styles from "./work-content-heading-block.module.sass"

export interface Props {
	text: string
}

const WorkContentHeadingBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<ContentAnchor anchor={props.text} />
		<h2>{props.text}</h2>
	</section>
)

export default WorkContentHeadingBlock
