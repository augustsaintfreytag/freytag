import { FunctionComponent, useMemo } from "react"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import BlockTag from "~/components/block-tag/block-tag"
import { useTagPropertiesForLifeEvent } from "~/components/block-tag/functions/life-event-block-tag-hook"
import Markdown from "~/components/markdown/markdown"
import Typo from "~/components/typo/typo"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { formattedOpenDateInterval } from "~/utils/date/functions/date-formatting"
import { OpenDateInterval } from "~/utils/date/library/intervals"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-title.module.sass"

// Hooks

function useFormattedInterval(interval?: OpenDateInterval): string | undefined {
	return useMemo(() => {
		return interval && formattedOpenDateInterval(interval)
	}, [interval])
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
	const tag = useTagPropertiesForLifeEvent(link?.kind)
	const interval = useFormattedInterval(link?.interval)

	return (
		<section className={className(props.className, styles.workTitle)}>
			<header>
				<h1>
					<Typo>{title}</Typo>
				</h1>
			</header>
			<main>
				{link && tag && (
					<div className={styles.link}>
						<BlockTag className={styles.tag} name={tag.name} color={tag.color} />
						<div className={styles.description}>
							<Typo>
								{link.title} ({interval})
							</Typo>
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
