import { GetServerSideProps } from "next"
import { useMemo } from "react"
import { getServerSideApiResponse, getServerSideApiResponses } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import { sortedWorkShowcases, workShowcasesFromApi } from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import WorkClosure from "~/components/work/work-closure/work-closure"
import { mappedWorkShowcaseListItemProps } from "~/components/work/work-content/functions/work-showcase-prop-mapping"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import WorkMeta from "~/components/work/work-meta/work-meta"
import WorkListSeo from "~/components/work/work-seo/work-list-seo"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import { URL } from "~/utils/routing/library/url"
import styles from "./work-page.module.sass"

// Library

interface PageData {
	preview?: URL
	showcases?: WorkShowcase[]
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () =>
	getServerSideApiResponses<PageData>(
		getServerSideApiResponse(workShowcasesFromApi, showcases => ({
			showcases: sortedWorkShowcases(showcases)
		})),
		getServerSideApiResponse(pageGraphicsFromApi, pageGraphics => ({ preview: pageGraphics.workPreview?.path }))
	)

const WorkListingPage: Page<PageProps & Props> = props => {
	const showcases = props.data?.showcases ?? []
	const showcaseIds = showcases.map(showcase => showcase._id)

	const workListItemProps = useMemo(() => {
		return showcases.map(showcase => mappedWorkShowcaseListItemProps(showcase))
	}, [showcaseIds])

	return (
		<>
			<WorkMeta previewAsset={props.data?.preview} />
			<section className={styles.page}>
				<h1>Work</h1>
				<div className={styles.workList}>
					{workListItemProps.map(props => (
						<WorkListItem
							headingText={props.headingText}
							previewText={props.previewText}
							image={props.image}
							href={props.href}
							key={props.id}
							link={props.link}
						></WorkListItem>
					))}
				</div>
				<WorkClosure showcases={showcases} />
			</section>
			<WorkListSeo />
		</>
	)
}

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
