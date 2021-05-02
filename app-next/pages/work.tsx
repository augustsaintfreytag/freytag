import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import DefaultLayout from "~/layouts/default/default-layout"
import { PageProps } from "~/pages/_app"
import { Page } from "~/types/page"
import * as DataAccess from "~/utils/api/common/functions/data-access"
import { dateFromTimestamp } from "~/utils/api/common/functions/date-conversion"
import { WorkShowcase } from "~/utils/api/records/work-showcase/work-showcase"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { denominatorDescription } from "~/utils/description/functions/denominator-description"
import { pageTitle } from "~/utils/title/functions/page-title"
import styles from "./work-page.module.sass"

// Library

type PageData = {
	showcases: WorkShowcase[]
}

type Props = {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	const data: PageData = { showcases: [] }

	try {
		const showcases = await DataAccess.workShowcases()
		data.showcases = DataAccess.sortedWorkShowcases(showcases)
	} catch (error) {
		console.error(`Could not fetch work showcase listing data. ${error}`)
	}

	return {
		props: { data }
	}
}

function lastShowcaseModificationFromShowcases(showcases: WorkShowcase[]): Date | undefined {
	const showcaseDates: Date[] = showcases
		.map(showcase => {
			const timestamp = showcase._created
			const date = dateFromTimestamp(timestamp)

			return date
		})
		.sort()

	if (!showcaseDates.length) {
		return undefined
	}

	return showcaseDates[showcaseDates.length - 1]
}

const WorkListingPage: Page<PageProps & Props> = props => {
	const showcases = props.data?.showcases ?? []
	const showcaseIds = showcases.map(showcase => showcase._id)

	const workListItemProps = useMemo(() => {
		return showcases.map(showcase => {
			const headingText = showcase.name
			const previewText = showcase.description ?? ""
			const image = DataAccess.imageUrl(showcase.teaserImage?.path)
			const href = `/work/${showcase.slug}`

			return { headingText, previewText, image, href }
		})
	}, [showcaseIds])

	const lastShowcaseCreationDate = useMemo(() => lastShowcaseModificationFromShowcases(showcases), [showcaseIds])
	const lastShowcaseCreation = (lastShowcaseCreationDate && formattedDate(lastShowcaseCreationDate, DateFormatStyle.DayMonthAndYear)) || "Never"

	return (
		<>
			<Head>
				<title>{pageTitle("Work")}</title>
			</Head>
			<section className={styles.page}>
				<h1 className={styles.semantic}>Work</h1>
				<div className={styles.workList}>
					{workListItemProps.map(props => {
						return <WorkListItem headingText={props.headingText} previewText={props.previewText} image={props.image} href={props.href}></WorkListItem>
					})}
				</div>
				<aside className={styles.closure}>
					<div>
						There are <em>{denominatorDescription({ singular: "showcase", plural: "showcases" }, showcases.length)} showcases</em> presented here.
					</div>
					<div>
						The last published showcase was created on <em>{lastShowcaseCreation}</em>.
					</div>
				</aside>
			</section>
		</>
	)
}

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
