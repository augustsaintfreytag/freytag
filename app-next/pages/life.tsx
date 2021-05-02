import { GetServerSideProps } from "next"
import { useMemo } from "react"
import { lifeTableItemDataFromEvents } from "~/components/life-table/functions/life-table-item-data"
import LifeTable from "~/components/life-table/life-table"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import DefaultLayout from "~/layouts/default/default-layout"
import { PageProps } from "~/pages/_app"
import { Page } from "~/types/page"
import * as DataAccess from "~/utils/api/common/functions/data-access"
import { LifeEvent } from "~/utils/api/records/life-event/life-event"
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
	const lifeEvents = await DataAccess.lifeEvents()
	const data = { lifeEvents }

	return {
		props: { data }
	}
}

const LifePage: Page<PageProps & Props> = props => {
	const lifeTableItemData = useMemo<LifeTableItemData[]>(() => lifeTableItemDataFromEvents(props.data.lifeEvents), [])

	return (
		<section className={styles.page}>
			<LifeTable data={lifeTableItemData} />
		</section>
	)
}

LifePage.layout = DefaultLayout

export default LifePage
