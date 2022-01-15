import { GetServerSideProps } from "next"
import { FunctionComponent, useMemo } from "react"
import { dateFromTimestamp } from "~/api/common/functions/date-conversion"
import { ColorDescription } from "~/api/common/library/color-description"
import { getServerSideResponseByQuery } from "~/api/props/functions/server-side-props"
import { workShowcaseFromApi } from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import Divider from "~/components/divider/divider"
import WorkContentClosureBlock from "~/components/work/work-content/components/work-content-closure-block"
import { workContentComponentForContent } from "~/components/work/work-content/functions/work-content-component-mapping"
import { linkPropsForShowcase } from "~/components/work/work-content/functions/work-link-props-mapping"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkShowcaseMeta from "~/components/work/work-meta/work-meta"
import WorkReiteration from "~/components/work/work-reiteration/work-reiteration"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import styles from "./work-detail-page.module.sass"

// Sub Components

interface WorkDividerProps {
	color?: ColorDescription
}

const WorkDivider: FunctionComponent<WorkDividerProps> = props => <Divider className={styles.divider} color={props.color} />

// Library

interface PageData {
	showcase?: WorkShowcase
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context =>
	getServerSideResponseByQuery(context, "work", workShowcaseFromApi, showcase => ({ showcase }))

const WorkDetailPage: Page<PageProps & Props> = props => {
	const showcase = props.data!.showcase!
	const name = showcase.name
	const abstract = showcase.description ?? "…"
	const cover = showcase.titleImage?.path
	const accentColor = showcase.accentColor
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
					<WorkReiteration aside={showcase.aside} />
				</header>
				<WorkDivider color={accentColor} />
				<main>
					{showcase.blocks?.map((blockLink, index) => workContentComponentForContent(showcase, index, blockLink))}
					<WorkDivider color={accentColor} />
					<WorkContentClosureBlock metadata={metadata} />
				</main>
			</article>
		</>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
