import Link from "next/link"
import { FunctionComponent } from "react"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import { AssetImageSize } from "~/components/asset-image/library/image-size"
import ViewportImageSet from "~/components/asset-image/viewport-image-set"
import BlockTag from "~/components/block-tag/block-tag"
import { useTagPropertiesForLifeEvent } from "~/components/block-tag/functions/life-event-block-tag-hook"
import { BlockTagAppearance } from "~/components/block-tag/library/block-tag-appearance"
import Markdown from "~/components/markdown/markdown"
import Sprite from "~/components/sprites/sprite"
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

	return (
		<section className={className(styles.workListItem, props.className)}>
			<Link href={props.href}>
				<a>
					<ViewportImageSet
						className={styles.image}
						src={{ desktop: props.image.trailing, mobile: props.image.centered }}
						format={{ size: AssetImageSize.Large }}
					/>
				</a>
			</Link>
			<div className={styles.inlay}>
				<div className={styles.inlayContent}>
					<BlockTag className={styles.tag} name={tag.name} color={tag.color} appearance={BlockTagAppearance.Decorative} />
					<h2 className={styles.heading}>{props.headingText}</h2>
					<div className={styles.preview}>
						<Markdown>{props.previewText}</Markdown>
					</div>
					<Link href={props.href}>
						<a>
							<div className={styles.link}>
								<div className={styles.text}>Read Now</div>
								<Sprite className={styles.symbol} href="#Arrow Top Right" />
							</div>
						</a>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default WorkListItem
