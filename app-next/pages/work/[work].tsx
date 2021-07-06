import { GetServerSideProps } from "next"
import { useMemo } from "react"
import { dateFromTimestamp } from "~/api/common/functions/date-conversion"
import { getServerSideApiResponseByQuery } from "~/api/props/functions/server-side-props"
import { workShowcaseFromApi } from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import Divider from "~/components/divider/divider"
import WorkContentClosureBlock from "~/components/work/work-content/components/work-content-closure-block"
import { workContentComponentForContent } from "~/components/work/work-content/functions/work-content-component-mapping"
import { linkPropsForShowcase } from "~/components/work/work-content/functions/work-link-props-mapping"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import WorkShowcaseMeta from "../../components/work/work-meta/work-showcase-meta"
import styles from "./work-detail-page.module.sass"

// Sub Components

const WorkDivider = () => <Divider className={styles.divider} />

// Library

interface PageData {
	showcase?: WorkShowcase
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context =>
	getServerSideApiResponseByQuery(context, "work", workShowcaseFromApi, showcase => ({ showcase }))

const WorkDetailPage: Page<PageProps & Props> = props => {
	const showcase = props.data!.showcase!
	const name = showcase.name
	const cover = showcase.titleImage?.path
	const abstract = showcase.description ?? "…"
	const link = linkPropsForShowcase(showcase)

	const metadata = useMemo(() => {
		let created: Date | undefined
		let modified: Date | undefined

		created = dateFromTimestamp(showcase._created)
		if (showcase._modified) {
			modified = dateFromTimestamp(showcase._modified)
		}

		return {
			created,
			modified
		}
	}, [showcase._created, showcase._modified])

	return (
		<>
			<WorkShowcaseMeta {...props.data} />
			<article className={styles.page}>
				<header>
					<WorkCover image={cover} />
					<WorkTitle className={styles.title} title={name} abstract={abstract} link={link} />
				</header>
				<WorkDivider />
				<main>
					{showcase.blocks?.map(blockLink => workContentComponentForContent(blockLink))}
					<WorkDivider />
					<WorkContentClosureBlock metadata={metadata} />
				</main>
			</article>
		</>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
