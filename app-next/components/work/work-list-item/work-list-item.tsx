import Link from "next/link"
import { FunctionComponent } from "react"
import Sprite from "~/components/sprites/sprite"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-list-item.module.sass"

type Props = {
	headingText: string
	previewText: string
	image: URL
	href: URL
}

const WorkListItem: FunctionComponent<Props> = props => (
	<section className={styles.workListItem}>
		<div className={styles.inlay}>
			<div className={styles.inlayContent}>
				<h2 className={styles.heading}>{props.headingText}</h2>
				<div className={styles.preview}>
					<p>{props.previewText}</p>
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
		<img className={styles.image} src={props.image} />
	</section>
)

export default WorkListItem
