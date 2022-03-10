import { FunctionComponent } from "react"
import { WorkContentImageAlignment } from "~/api/cockpit/records/work-showcase/library/work-showcase-image-alignment"
import { uniformViewportAssetImageFormats } from "~/components/asset-image/functions/asset-image-prop-mapping"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"
import WorkImageFigure, { ImageFigureProps } from "~/components/work/work-image-figure/work-image-figure"
import { className } from "~/utils/class-names/class-name"
import styles from "./work-content-images-block.module.sass"

export interface Props {
	collection: ImageFigureProps[]
	alignment?: WorkContentImageAlignment
}

function contentImageFormats(alignment: WorkContentImageAlignment, contentHasMultipleImages: boolean): ViewportAssetImageFormats {
	if (alignment === WorkContentImageAlignment.RowsOnly || !contentHasMultipleImages) {
		return uniformViewportAssetImageFormats({ size: AssetImageSize.Large })
	}

	return {
		desktop: { size: AssetImageSize.Regular },
		tablet: { size: AssetImageSize.Large },
		phone: { size: AssetImageSize.Large }
	}
}

const WorkContentImageColumnBlock: FunctionComponent<Props> = props => {
	const contentAlignment = props.alignment ?? WorkContentImageAlignment.Default
	const alignmentStyle = contentAlignment === WorkContentImageAlignment.RowsOnly ? styles.rowsOnlyAlignment : styles.defaultAlignment

	const contentHasMultipleImages = props.collection.length > 1
	const contentStyle = contentHasMultipleImages ? styles.multipleImages : styles.singleImage
	const contentFormats = contentImageFormats(contentAlignment, contentHasMultipleImages)

	return (
		<div className={className(styles.block, contentStyle, alignmentStyle)}>
			{props.collection.map(elementProps => (
				<WorkImageFigure key={elementProps.src} formats={contentFormats} {...elementProps} />
			))}
		</div>
	)
}

export default WorkContentImageColumnBlock
