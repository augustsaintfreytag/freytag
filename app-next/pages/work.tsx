import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import { getServerSideApiResponse } from "~/api/props/functions/server-side-props"
import {
	averageTimeIntervalBetweenShowcases,
	lastWorkShowcaseModificationDate,
	sortedWorkShowcases,
	workShowcasesFromApi
} from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { mappedWorkShowcaseListItemProps } from "~/api/records/work-showcase/functions/work-showcase-prop-mapping"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { formattedTimeInterval } from "~/utils/date/functions/time-formatting"
import { denominatorDescription } from "~/utils/description/functions/denominator-description"
import { pageTitle } from "~/utils/title/functions/page-title"
import styles from "./work-page.module.sass"

// Library

interface PageData {
	showcases: WorkShowcase[]
}

interface Props {
	data?: PageData
}

// Page

function mapPageData(showcases: WorkShowcase[]): PageData {
	showcases = sortedWorkShowcases(showcases)
	return { showcases }
}

export const getServerSideProps: GetServerSideProps<Props, {}> = async () => {
	return await getServerSideApiResponse<WorkShowcase[], PageData>(workShowcasesFromApi, mapPageData)
}

const WorkListingPage: Page<PageProps & Props> = props => {
	const showcases = props.data?.showcases ?? []
	const showcaseIds = showcases.map(showcase => showcase._id)

	const workListItemProps = useMemo(() => {
		return showcases.map(showcase => mappedWorkShowcaseListItemProps(showcase))
	}, [showcaseIds])

	const lastShowcaseCreation = useMemo<string | undefined>(() => {
		const lastCreationDate = lastWorkShowcaseModificationDate(showcases)
		if (!lastCreationDate) {
			return undefined
		}

		return formattedDate(lastCreationDate, DateFormatStyle.DayMonthAndYear)
	}, [showcaseIds])

	const averageShowcaseCreation = useMemo<string | undefined>(() => {
		const averageInterval = averageTimeIntervalBetweenShowcases(showcases)
		if (!averageInterval) {
			return undefined
		}

		return formattedTimeInterval(averageInterval)
	}, [showcaseIds])

	return (
		<>
			<Head>
				<title>{pageTitle("Work")}</title>
			</Head>
			<section className={styles.page}>
				<h1>Work</h1>
				<div className={styles.workList}>
					{workListItemProps.map(props => {
						return (
							<WorkListItem
								headingText={props.headingText}
								previewText={props.previewText}
								image={props.image}
								href={props.href}
								key={props.id}
							></WorkListItem>
						)
					})}
				</div>
				<aside className={styles.closure}>
					<div>
						There are <em>{denominatorDescription({ singular: "showcase", plural: "showcases" }, showcases.length)}</em> presented here.
					</div>
					{averageShowcaseCreation && (
						<div>
							A showcase is published on average every <em>{averageShowcaseCreation}</em>, last release on <em>{lastShowcaseCreation}</em>.
						</div>
					)}
				</aside>
			</section>
		</>
	)
}

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
