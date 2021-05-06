import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import { lifeEventsFromApi } from "~/api/records/life-event/functions/life-event-data-access"
import { LifeEvent } from "~/api/records/life-event/library/life-event"
import { lifeTableItemDataFromEvents } from "~/components/life-table/functions/life-table-item-data-form"
import LifeTable from "~/components/life-table/life-table"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page, PageProps } from "~/types/page"
import { pageTitle } from "~/utils/title/functions/page-title"
import styles from "./life-page.module.sass"

// Library

type PageData = {
	lifeEvents: LifeEvent[]
}

type Props = {
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
				<LifeTable data={lifeTableItemData} />
			</section>
		</>
	)
}

LifePage.layout = DefaultLayout

export default LifePage
