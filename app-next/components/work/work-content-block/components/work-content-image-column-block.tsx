import { FunctionComponent } from "react"
import ImageFigure, { ImageFigureProps } from "~/components/image-figure/image-figure"
import { className } from "~/utils/class-names/class-name"
import styles from "./work-content-image-column-block.module.sass"

type Props = {
	collection: ImageFigureProps[]
}

const WorkContentImageColumnBlock: FunctionComponent<Props> = props => {
	const contentStyle = (() => {
		if (props.collection.length > 1) {
			return styles.multipleImages
		}

		return styles.singleImage
	})()

	return (
		<section className={className(styles.block, contentStyle)}>
			{props.collection.map(elementProps => (
				<ImageFigure key={elementProps.src} {...elementProps} />
			))}
		</section>
	)
}

export default WorkContentImageColumnBlock
