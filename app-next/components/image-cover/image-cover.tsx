import { FunctionComponent, useMemo } from "react"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"
import ViewportImage from "~/components/asset-image/viewport-image"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URLComponent } from "~/utils/routing/library/url"
import styles from "./image-cover.module.sass"

type Props = PropsWithClassName & {
	src?: URLComponent
	description?: string
}

const ImageCover: FunctionComponent<Props> = props => {
	const formats = useMemo(() => {
		const size = AssetImageSize.ExtraLarge
		const height = 1400
		const formats: ViewportAssetImageFormats = {
			desktop: { size },
			tablet: { size, crop: { height, factor: 0.6 } },
			phone: { size, crop: { height, factor: 0.45 } }
		}

		return formats
	}, [])
	return (
		<div className={className(props.className, styles.cover)}>
			<ViewportImage className={styles.image} src={props.src} formats={formats} alt={props.description} />
		</div>
	)
}

export default ImageCover
