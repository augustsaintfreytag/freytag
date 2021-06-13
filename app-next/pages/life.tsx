import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import { lifeEventsFromApi } from "~/api/records/life-event/functions/life-event-data-access"
import { LifeEvent } from "~/api/records/life-event/library/life-event"
import { lifeTableItemDataFromEvents } from "~/components/life/life-table/functions/life-table-item-data-form"
import LifeTable from "~/components/life/life-table/life-table"
import { LifeTableItemData } from "~/components/life/life-table/models/life-table-item-data"
import { pageTitle } from "~/components/meta/functions/page-title"
import LifeSeo from "~/components/seo/life-seo"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import styles from "./life-page.module.sass"

// Library

interface PageData {
	lifeEvents: LifeEvent[]
}

interface Props {
	data: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	const lifeEvents = await lifeEventsFromApi()
	const data = { lifeEvents }

	return {
		props: { data }
	}
}

const LifePage: Page<PageProps & Props> = props => {
	const lifeTableItemData = useMemo<LifeTableItemData[]>(() => lifeTableItemDataFromEvents(props.data.lifeEvents), [])

	return (
		<>
			<Head>
				<title>{pageTitle("Life")}</title>
			</Head>
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
