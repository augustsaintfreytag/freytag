import { FunctionComponent } from "react"
import styles from "./work-content-heading-block.module.sass"

type Props = {
	text: string
}

const WorkContentHeadingBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<h2>{props.text}</h2>
	</section>
)

export default WorkContentHeadingBlock
