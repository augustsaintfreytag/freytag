import { FunctionComponent } from "react"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-content-image-block.module.sass"

type Props = {
	src?: URL
}

const WorkContentImageBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<img src={props.src} />
	</section>
)

export default WorkContentImageBlock
