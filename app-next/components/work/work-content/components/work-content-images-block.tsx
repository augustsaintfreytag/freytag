import { FunctionComponent } from "react"
import { WorkContentImageAlignment } from "~/api/records/work-showcase/library/work-showcase-image-alignment"
import WorkImageFigure, { ImageFigureProps } from "~/components/work/work-image-figure/work-image-figure"
import { className } from "~/utils/class-names/class-name"
import styles from "./work-content-images-block.module.sass"

export interface Props {
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
				<WorkImageFigure key={elementProps.src} {...elementProps} />
			))}
		</section>
	)
}

export default WorkContentImageColumnBlock
