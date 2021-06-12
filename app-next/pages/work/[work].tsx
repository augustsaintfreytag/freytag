import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import { dateFromTimestamp } from "~/api/common/functions/date-conversion"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { getServerSideApiResponseByQuery } from "~/api/props/functions/server-side-props"
import { imageUrlFromComponent } from "~/api/records/asset/functions/image-record-data-access"
import { workShowcaseFromApi } from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import Divider from "~/components/divider/divider"
import { pageTitle } from "~/components/meta/functions/page-title"
import WorkContentClosureBlock from "~/components/work/work-content/components/work-content-closure-block"
import { workContentComponentForContent } from "~/components/work/work-content/functions/work-content-component-mapping"
import { linkPropsForShowcase } from "~/components/work/work-content/functions/work-link-props-mapping"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import styles from "./work-detail-page.module.sass"

// Sub Components

const WorkDivider = () => <Divider className={styles.divider} />

// Library

interface PageData {
	showcase: WorkShowcase
}

interface Props {
	data?: PageData
}

// Page

function mapPageData(showcase: WorkShowcase): PageData {
	return { showcase }
}

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	return await getServerSideApiResponseByQuery<WorkShowcase, PageData>(context, "work", workShowcaseFromApi, mapPageData)
}

const WorkDetailPage: Page<PageProps & Props> = props => {
	const showcase = props.data!.showcase!
	const name = showcase.name
	const cover = imageUrlFromComponent(showcase.titleImage?.path, ImageFormat.ExtraLarge)
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
			<Head>
				<title>{pageTitle(name)}</title>
			</Head>
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
