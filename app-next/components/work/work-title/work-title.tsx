import { FunctionComponent, useMemo } from "react"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import BlockTag from "~/components/block-tag/block-tag"
import Markdown from "~/components/markdown/markdown"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { formattedOpenDateInterval } from "~/utils/date/functions/date-formatting"
import { OpenDateInterval } from "~/utils/date/library/intervals"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-title.module.sass"

// Utility

interface TagProperties {
	name: string
	representation: string
}

function tagPropertiesForKind(kind: LifeEventKind): TagProperties | undefined {
	return { name: kind, representation: kind.toLowerCase() }
}

// Component

type Props = PropsWithClassName & {
	title: string
	abstract: string
	link?: {
		href?: URL
		kind: LifeEventKind
		title: string
		interval: OpenDateInterval
	}
}

const WorkTitle: FunctionComponent<Props> = props => {
	const { title, abstract, link } = props
	const tag: TagProperties | undefined = useMemo(() => {
		return link && tagPropertiesForKind(link?.kind)
	}, [link])

	const formattedLinkInterval: string | undefined = useMemo(() => {
		return link && formattedOpenDateInterval(link.interval)
	}, [link])

	return (
		<section className={className(props.className, styles.workTitle)}>
			<header>
				<h1>{title}</h1>
			</header>
			<main>
				{link && tag && (
					<div className={styles.link}>
						<BlockTag className={styles.tag} name={tag.name} representation={tag.representation} />
						<div className={styles.description}>
							{link.title} ({formattedLinkInterval})
						</div>
					</div>
				)}
				<div className={styles.abstract}>
					<Markdown>{abstract}</Markdown>
				</div>
			</main>
		</section>
	)
}

export default WorkTitle
