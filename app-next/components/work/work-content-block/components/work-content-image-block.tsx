import { FunctionComponent } from "react"
import ImageFigure, { Props as ImageFigureProps } from "~/components/image-figure/image-figure"
import styles from "./work-content-image-block.module.sass"

type Props = ImageFigureProps

const WorkContentImageBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<ImageFigure {...props} />
	</section>
)

export default WorkContentImageBlock
