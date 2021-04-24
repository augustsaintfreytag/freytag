import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./image-cover.module.sass"

type Props = PropsWithClassName & {
	src: URL
	description?: string
}

const ImageCover: FunctionComponent<Props> = props => (
	<div className={className(props.className, styles.cover)}>
		<img src={props.src} alt={props.description} />
	</div>
)

export default ImageCover
