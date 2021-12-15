import { GetServerSideProps } from "next"
import { useMemo } from "react"
import { getServerSideResponse, getServerSideResponses } from "~/api/props/functions/server-side-props"
import { lifeEventsFromApi } from "~/api/records/life-event/functions/life-event-data-access"
import { LifeEvent } from "~/api/records/life-event/library/life-event"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import LifeMeta from "~/components/life/life-meta/life-meta"
import LifeSeo from "~/components/life/life-seo/life-seo"
import { lifeTableItemDataFromEvents } from "~/components/life/life-table/functions/life-table-item-data-form"
import LifeTable from "~/components/life/life-table/life-table"
import { LifeTableItemData } from "~/components/life/life-table/models/life-table-item-data"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import { URL } from "~/utils/routing/library/url"
import styles from "./life-page.module.sass"

// Library

interface PageData {
	preview?: URL
	lifeEvents?: LifeEvent[]
}

interface Props {
	data: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () =>
	getServerSideResponses<PageData>(
		getServerSideResponse(lifeEventsFromApi, lifeEvents => ({ lifeEvents })),
		getServerSideResponse(pageGraphicsFromApi, pageGraphics => ({
			preview: pageGraphics.lifePreview?.path
		}))
	)

const LifePage: Page<PageProps & Props> = props => {
	const lifeTableItemData = useMemo<LifeTableItemData[]>(() => lifeTableItemDataFromEvents(props.data.lifeEvents ?? []), [])

	return (
		<>
			<LifeMeta previewImage={props.data.preview} />
			<section className={styles.page}>
				<h1>Life</h1>
				<LifeTable data={lifeTableItemData} />
			</section>
			<LifeSeo />
		</>
	)
}

LifePage.layout = DefaultLayout

export default LifePage
