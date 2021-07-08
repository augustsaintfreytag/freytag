import { FunctionComponent } from "react"
import AssetImage from "~/components/asset-image/asset-image"
import { ViewportImageFormats } from "~/components/asset-image/library/viewport-sources"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./work-image-figure.module.sass"

type Props = PropsWithClassName & {
	src?: URLComponent
	formats?: ViewportImageFormats
	caption?: string
}

const WorkImageFigure: FunctionComponent<Props> = props => (
	<figure className={className(styles.figure, props.className)}>
		<AssetImage className={styles.image} src={props.src} formats={props.formats} />
		{props.caption && <figcaption>{props.caption}</figcaption>}
	</figure>
)

export default WorkImageFigure

export type ImageFigureProps = Props
