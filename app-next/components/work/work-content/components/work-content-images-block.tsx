import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
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

	const contentHasMultipleImages = props.collection.length > 1
	const contentStyle = contentHasMultipleImages ? styles.multipleImages : styles.singleImage
	const contentFormat = contentAlignment === WorkContentImageAlignment.RowsOnly || !contentHasMultipleImages ? ImageFormat.Large : ImageFormat.Regular

	return (
		<section className={className(styles.block, contentStyle, alignmentStyle)}>
			{props.collection.map(elementProps => (
				<WorkImageFigure key={elementProps.src} format={contentFormat} {...elementProps} />
			))}
		</section>
	)
}

export default WorkContentImageColumnBlock
