import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-content-image-heading-block.module.sass"

type Props = {
	heading: string
	subHeading: string
	image: URL
}

const WorkContentImageTitleBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<div className={styles.image}>
			<img src={props.image} />
		</div>
		<h2 className={styles.heading}>{props.heading}</h2>
		<div className={styles.subHeading}>
			<Markdown>{props.subHeading}</Markdown>
		</div>
	</section>
)

export default WorkContentImageTitleBlock
