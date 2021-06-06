import { FunctionComponent } from "react"
import { WorkContentImageAlignment } from "~/api/records/work-showcase/library/work-showcase-image-alignment"
import ImageFigure, { ImageFigureProps } from "~/components/image-figure/image-figure"
import { className } from "~/utils/class-names/class-name"
import styles from "./work-content-image-column-block.module.sass"

interface Props {
	collection: ImageFigureProps[]
	alignment?: WorkContentImageAlignment
}

const WorkContentImageColumnBlock: FunctionComponent<Props> = props => {
	const contentAlignment = props.alignment ?? WorkContentImageAlignment.Default
	const alignmentStyle = contentAlignment === WorkContentImageAlignment.RowsOnly ? styles.rowsOnlyAlignment : styles.defaultAlignment

	const contentStyle = (() => {
		if (props.collection.length > 1) {
			return styles.multipleImages
		}

		return styles.singleImage
	})()

	return (
		<section className={className(styles.block, contentStyle, alignmentStyle)}>
			{props.collection.map(elementProps => (
				<ImageFigure key={elementProps.src} {...elementProps} />
			))}
		</section>
	)
}

export default WorkContentImageColumnBlock
