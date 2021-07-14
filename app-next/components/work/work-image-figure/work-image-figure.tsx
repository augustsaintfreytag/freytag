import { FunctionComponent } from "react"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"
import ViewportImage from "~/components/asset-image/viewport-image"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./work-image-figure.module.sass"

type Props = PropsWithClassName & {
	src?: URLComponent
	formats?: ViewportAssetImageFormats
	caption?: string
}

const WorkImageFigure: FunctionComponent<Props> = props => (
	<figure className={className(styles.figure, props.className)}>
		<div className={styles.inlay}>
			<ViewportImage className={styles.image} src={props.src} formats={props.formats} />
		</div>
		{props.caption && <figcaption>{props.caption}</figcaption>}
	</figure>
)

export default WorkImageFigure

export type ImageFigureProps = Props
