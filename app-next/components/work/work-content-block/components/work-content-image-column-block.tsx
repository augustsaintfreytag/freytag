import { FunctionComponent } from "react"
import ImageFigure, { ImageFigureProps } from "~/components/image-figure/image-figure"
import styles from "./work-content-image-column-block.module.sass"

type Props = {
	collection: ImageFigureProps[]
}

const WorkContentImageColumnBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		{props.collection.map(elementProps => (
			<ImageFigure {...elementProps} />
		))}
	</section>
)

export default WorkContentImageColumnBlock
