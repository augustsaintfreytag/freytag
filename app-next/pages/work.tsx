import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import { getServerSideApiResponse } from "~/api/props/functions/server-side-props"
import { sortedWorkShowcases, workShowcasesFromApi } from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import { pageTitle } from "~/components/meta/functions/page-title"
import WorkSeo from "~/components/seo/work-seo"
import WorkClosure from "~/components/work/work-closure/work-closure"
import { mappedWorkShowcaseListItemProps } from "~/components/work/work-content/functions/work-showcase-prop-mapping"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
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
				<WorkClosure showcases={showcases} />
			</section>
			<WorkSeo />
		</>
	)
}

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
