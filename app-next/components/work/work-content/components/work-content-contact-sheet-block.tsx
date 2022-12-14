import Link from "next/link"
import { FunctionComponent } from "react"
import { ImageLink } from "~/api/cockpit/records/asset/library/image-link"
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
	<div className={styles.block}>
		<div className={styles.inlay}>
			<ol>
				{props.images.map(definition => (
					<li key={definition.anchor}>
						<Link href={`#${definition.anchor}`}>
							<a>
								<AssetImage className={styles.image} src={definition.image.path} format={{ size: AssetImageSize.Small }} lazy />
							</a>
						</Link>
					</li>
				))}
			</ol>
		</div>
	</div>
)

export default WorkContentContactSheetBlock
