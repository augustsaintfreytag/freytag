import { FunctionComponent } from "react"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import ViewportImage from "~/components/asset-image/viewport-image"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./image-cover.module.sass"

type Props = PropsWithClassName & {
	src?: URLComponent
	description?: string
}

const ImageCover: FunctionComponent<Props> = props => (
	<div className={className(props.className, styles.cover)}>
		<ViewportImage className={styles.image} src={props.src} format={ImageFormat.ExtraLarge} alt={props.description} />
	</div>
)

export default ImageCover
