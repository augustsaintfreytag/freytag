import { FunctionComponent } from "react"
import VideoEmbed from "~/components/video-embed/video-embed"
import styles from "./work-content-video-block.module.sass"

export interface Props {
	code: string
	aspect?: string
}

const WorkContentVideoBlock: FunctionComponent<Props> = props => {
	return (
		<section className={styles.block}>
			<VideoEmbed code={props.code} aspect={props.aspect} />
		</section>
	)
}

export default WorkContentVideoBlock
