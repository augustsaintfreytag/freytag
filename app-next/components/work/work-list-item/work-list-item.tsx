import Link from "next/link"
import { FunctionComponent, useMemo } from "react"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import AssetImageSet from "~/components/asset-image/asset-image-set"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import { ViewportAssetImageFormats } from "~/components/asset-image/library/viewport-sources"
import BlockTag from "~/components/block-tag/block-tag"
import { useTagPropertiesForLifeEvent } from "~/components/block-tag/functions/life-event-block-tag-hook"
import { BlockTagAppearance } from "~/components/block-tag/library/block-tag-appearance"
import DecoratedInternalLink from "~/components/link/decorated-internal-link"
import Markdown from "~/components/markdown/markdown"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL, URLComponent } from "~/utils/routing/library/url"
import styles from "./work-list-item.module.sass"

interface ImageProps {
	trailing: URLComponent
	centered: URLComponent
}

interface Props extends PropsWithClassName {
	headingText: string
	previewText: string
	image: ImageProps
	href: URL
	link?: {
		kind: LifeEventKind
	}
}

const WorkListItem: FunctionComponent<Props> = props => {
	const tag = useTagPropertiesForLifeEvent(props.link?.kind)
	const images = { desktop: props.image.trailing, mobile: props.image.centered }
	const formats = useMemo(() => {
		const size = AssetImageSize.ExtraLarge
		const height = 800
		const formats: ViewportAssetImageFormats = {
			desktop: { size },
			tablet: { size, crop: { height, factor: 0.6 } },
			phone: { size, crop: { height, factor: 0.45 } }
		}

		return formats
	}, [])

	return (
		<section className={className(styles.workListItem, props.className)}>
			<Link href={props.href}>
				<a>
					<AssetImageSet className={styles.image} src={images} formats={formats} lazy />
				</a>
			</Link>
			<div className={styles.inlay}>
				<div className={styles.inlayContent}>
					<BlockTag className={styles.tag} name={tag.name} color={tag.color} appearance={BlockTagAppearance.Decorative} />
					<h2 className={styles.heading}>{props.headingText}</h2>
					<div className={styles.preview}>
						<Markdown>{props.previewText}</Markdown>
					</div>
					<DecoratedInternalLink className={styles.link} href={props.href} text="Read Now" compact />
				</div>
			</div>
		</section>
	)
}

export default WorkListItem
