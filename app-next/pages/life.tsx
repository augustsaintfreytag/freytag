import LifeTable from "~/components/life-table/life-table"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import { LifeEventKind } from "~/utils/api/life-event/library/life-event-kind"
import styles from "./life-page.module.sass"

const items: LifeTableItemData[] = [
	{
		name: "Folio Twenty-Twenty-One",
		kind: LifeEventKind.Development,
		interval: { start: new Date(1612170006 * 1000), end: new Date(1614589206 * 1000) },
		format: "Web Application",
		role: "Designer, Developer",
		context: "Reinvention of the Folio Freytag, following through with a new look optimised for past and future showcases."
	},
	{
		name: "Unannounced Game Jam",
		kind: LifeEventKind.Development,
		interval: { start: new Date(1610170006 * 1000) },
		format: "Game",
		role: "Co-Writer, Game Designer",
		context: "Mus fringilla, odio sem nibh eget felis consectetur a sem dignissim dignissim ridiculus felis facilisi vestibulum nascetur."
	},
	{
		name: "Listener on Macintosh",
		kind: LifeEventKind.Graphics,
		interval: { end: new Date(1611135006 * 1000) },
		format: "Digital Art",
		role: "Designer",
		context: "Sem dignissim dignissim ridiculus felis facilisi vestibulum nascetur nostra consequat feugiat a est penatibus id conubia netus."
	},
	{
		name: "Unannounced Short Film",
		kind: LifeEventKind.Film,
		interval: { end: new Date(1618835006 * 1000) },
		format: "Short Film",
		role: "Writer",
		context: "Nascetur nostra consequat feugiat a est penatibus id conubia netus — felis consectetur a sem dignissim dignissim."
	}
]

const WorkListingPage: Page = () => (
	<section className={styles.page}>
		<LifeTable data={items} />
	</section>
)

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
