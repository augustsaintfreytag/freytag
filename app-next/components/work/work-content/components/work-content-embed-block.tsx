import { FunctionComponent } from "react"
import styles from "./work-content-embed-block.module.sass"

export interface Props {
	code?: string
}

const WorkContentEmbedBlock: FunctionComponent<Props> = props => (
	<div className={styles.block}>{props.code && <span dangerouslySetInnerHTML={{ __html: props.code }} />}</div>
)

export default WorkContentEmbedBlock
