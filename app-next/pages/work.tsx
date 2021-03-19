import Head from "next/head"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import DefaultLayout from "~/layouts/default/default-layout"
import { Page } from "~/types/page"
import { pageTitle } from "~/utils/title/functions/page-title"
import styles from "./work.module.sass"

const WorkListingPage: Page = () => (
	<>
		<Head>
			<title>{pageTitle("Work")}</title>
		</Head>
		<section className={styles.page}>
			<h1 className={styles.semantic}>Work</h1>
			<div className={styles.workList}>
				<WorkListItem
					headingText="With Signs of Defeat"
					previewText="Augue non imperdiet faucibus rutrum, ad dui suscipit dis egestas venenatis pharetra massa, fringilla vestibulum ac per cras adipiscing. Nullam a pulvinar scelerisque ut adipiscing elit."
					image="/showcase-churchview.jpg"
					href="/work/a0-12-24"
				/>
				<WorkListItem
					headingText="Troubles and Minds"
					previewText="Aarturient hac ligula, sociis senectus at a condimentum — vulputate mi fringilla metus parturient habitant. Fames nibh, phasellus vestibulum a condimentum nilet est."
					image="/showcase-forest-perch.jpg"
					href="/work/a0-14-24"
				/>
			</div>
			<aside className={styles.closure}>
				<div>
					There are <em>8 showcases</em> presented here, containing <em>48 samples</em> total.
				</div>
				<div>
					Showcases are prepared and published on average every <em>2 months</em>.
				</div>
			</aside>
		</section>
	</>
)

WorkListingPage.layout = DefaultLayout

export default WorkListingPage
