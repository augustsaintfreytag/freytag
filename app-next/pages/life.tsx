import { GetServerSideProps } from "next"
import { useMemo } from "react"
import LifeTable from "~/components/life-table/life-table"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import * as DataAccess from "~/utils/api/common/functions/data-access"
import { lifeTableItemDataFromEvents } from "~/utils/api/prefabs/life/functions/life-table-item-data"
import { LifeEvent } from "~/utils/api/records/life-event/library/life-event"
import styles from "./life-page.module.sass"

type PageData = {
	lifeEvents: LifeEvent[]
}

type Props = {
	data: PageData
}

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	const lifeEvents = await DataAccess.lifeEvents()
	const data = { lifeEvents }

	return {
		props: { data }
	}
}

const WorkListingPage: Page<Props> = props => {
	const lifeTableItemData = useMemo<LifeTableItemData[]>(() => lifeTableItemDataFromEvents(props.data.lifeEvents), [])

	return (
		<section className={styles.page}>
			<LifeTable data={lifeTableItemData} />
		</section>
	)
}

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
