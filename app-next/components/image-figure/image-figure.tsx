import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./image-figure.module.sass"

export type Props = PropsWithClassName & {
	src?: URL
	caption?: string
}

const ImageFigure: FunctionComponent<Props> = props => (
	<figure className={className(styles.figure, props.className)}>
		<img src={props.src} />
		{props.caption && <figcaption>{props.caption}</figcaption>}
	</figure>
)

export default ImageFigure
