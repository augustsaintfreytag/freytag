import { FunctionComponent } from "react"
import { ImageLink } from "~/api/records/asset/library/image-link"
import AssetImage from "~/components/asset-image/asset-image"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import styles from "./work-content-contact-sheet-block.module.sass"

export interface ImageDefinition {
	anchor: string
	image: ImageLink
}

export interface Props {
	images: ImageDefinition[]
}

const WorkContentContactSheetBlock: FunctionComponent<Props> = props => (
	<section className={styles.block}>
		<div className={styles.inlay}>
			<ol>
				{props.images.map(definition => (
					<li key={definition.anchor}>
						<AssetImage className={styles.image} src={definition.image.path} format={{ size: AssetImageSize.Small }} />
					</li>
				))}
			</ol>
		</div>
	</section>
)

export default WorkContentContactSheetBlock
