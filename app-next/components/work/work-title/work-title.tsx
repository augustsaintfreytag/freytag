import { FunctionComponent } from "react"
import { LifeEventKind } from "~/api/cockpit/records/life-event/library/life-event-kind"
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

// Component

interface LinkProps {
	href?: URL
	kind: LifeEventKind
	title: string
	interval: OpenDateInterval
	wantsReducedAppearance?: boolean
}

interface Props extends PropsWithClassName {
	title: string
	abstract: string
	link?: LinkProps
}

function appearanceClassName(wantsReducedAppearance?: boolean): string {
	if (wantsReducedAppearance) {
		return styles.reducedAppearance
	}

	return styles.defaultAppearance
}

function formattedLinkTitle(props: LinkProps): string {
	const interval = props.interval
	const formattedInterval = (interval && formattedOpenDateInterval(interval)) ?? "Unknown Time"

	if (props.wantsReducedAppearance) {
		return formattedInterval
	}

	return `${props.title} (${formattedInterval})`
}

const WorkTitle: FunctionComponent<Props> = props => {
	const { title, abstract, link } = props
	const tag = useTagPropertiesForLifeEvent(link?.kind)

	return (
		<section className={className(props.className, styles.block, appearanceClassName(link?.wantsReducedAppearance))}>
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
							<Typo>{formattedLinkTitle(link)}</Typo>
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
