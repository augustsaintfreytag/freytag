import { GetServerSideProps } from "next"
import Divider from "~/components/divider/divider"
import WorkContentBlock from "~/components/work/work-content-block/components/work-content-block"
import { workContentBlockKindFromLegacy } from "~/components/work/work-content-block/library/work-content-block-kind"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import { PageProps } from "~/pages/_app"
import type { Page } from "~/types/page"
import { intervalFromFragment } from "~/utils/api/common/functions/date-conversion"
import { imageUrlFromComponent } from "~/utils/api/records/image/functions/image-record-data-access"
import { LifeEventKind, lifeEventKindFromRawValue } from "~/utils/api/records/life-event/library/life-event-kind"
import { workShowcaseFromApi } from "~/utils/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/utils/api/records/work-showcase/library/work-showcase"
import { OpenDateInterval } from "~/utils/date/library/intervals"
import styles from "./work-detail-page.module.sass"

// Library

type PageData = {
	showcase: WorkShowcase
}

type Props = {
	data?: PageData
}

// Processing

type LinkProperties = {
	kind: LifeEventKind
	title: string
	interval: OpenDateInterval
}

function linkPropertiesForShowcase(showcase: WorkShowcase): LinkProperties | undefined {
	const event = showcase.event

	if (!event) {
		return undefined
	}

	const eventKind = lifeEventKindFromRawValue(event.kind)
	const eventInterval = intervalFromFragment(event)

	if (!eventKind || !eventInterval) {
		return undefined
	}

	return {
		kind: eventKind,
		title: event.name,
		interval: eventInterval
	}
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	const showcaseId = context.query["work"]

	if (!showcaseId || typeof showcaseId !== "string") {
		return { notFound: true }
	}

	try {
		const showcase = await workShowcaseFromApi(showcaseId)
		if (!showcase) {
			return { notFound: true }
		}

		const data: PageData = { showcase }
		return { props: { data } }
	} catch (error) {
		return { notFound: true }
	}
}

const WorkDetailPage: Page<PageProps & Props> = props => {
	const showcase = props.data!.showcase!
	const name = showcase.name
	const abstract = showcase.description ?? "…"
	const link = linkPropertiesForShowcase(showcase)

	return (
		<>
			<article className={styles.page}>
				<header>
					<WorkCover image={imageUrlFromComponent(undefined)} />
					<WorkTitle className={styles.title} title={name} abstract={abstract} link={link} />
				</header>
				<Divider className={styles.divider} />
				<main>
					{showcase.blocks?.map(block => {
						const kind = workContentBlockKindFromLegacy(block.form)
						if (!kind) {
							return undefined
						}

						return <WorkContentBlock key={block._id} kind={kind} block={block} />
					})}
				</main>
			</article>
		</>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
