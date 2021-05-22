import Link from "next/link"
import { FunctionComponent } from "react"
import Markdown from "~/components/markdown/markdown"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-list-item.module.sass"

type Props = PropsWithClassName & {
	headingText: string
	previewText: string
	image: URL
	href: URL
}

const WorkListItem: FunctionComponent<Props> = props => (
	<section className={className(styles.workListItem, props.className)}>
		<img className={styles.image} src={props.image} />
		<div className={styles.inlay}>
			<div className={styles.inlayContent}>
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

export default WorkListItem
