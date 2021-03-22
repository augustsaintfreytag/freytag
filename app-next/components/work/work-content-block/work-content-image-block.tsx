import { FunctionComponent } from "react"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-content-image-block.module.sass"

type Props = {
	src?: URL
	caption?: string
}

const WorkContentImageBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<figure>
			<img src={props.src} />
			{props.caption && <figcaption>{props.caption}</figcaption>}
		</figure>
	</section>
)

export default WorkContentImageBlock
