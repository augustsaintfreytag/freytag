import { FunctionComponent } from "react"
import BlockTag from "~/components/block-tag/block-tag"
import { PropsWithClassName } from "~/types/props"
import { LifeEventKind } from "~/utils/api/records/life-event/life-event-kind"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-title.module.sass"

type Props = PropsWithClassName & {
	title: string
	abstract: string
	link?: {
		href?: URL
		kind: LifeEventKind
		title: string
	}
}

const WorkTitle: FunctionComponent<Props> = props => (
	<section className={className(props.className, styles.workTitle)}>
		<header>
			<h1>{props.title}</h1>
		</header>
		<main>
			<div className={styles.link}>
				<BlockTag className={styles.tag} name="Writing" representation="writing" />
				<div className={styles.description}>Project X (05/2039 – 09/2039)</div>
			</div>
			<div className={styles.abstract}>
				<p>{props.abstract}</p>
			</div>
		</main>
	</section>
)

export default WorkTitle
