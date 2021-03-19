import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import { PageProps } from "~/pages/_app"
import type { Page } from "~/types/page"
import { LifeEventKind } from "~/utils/api/life-event/library/life-event-kind"
import { stringParameter } from "~/utils/routing/functions/route-parameters"
import styles from "./work-detail.module.sass"

const WorkDetailPage: Page<PageProps> = props => {
	const workId = stringParameter(props.router, "work")
	// return <span>Work Detail with Id '{workId}'</span>

	return (
		<section className={styles.page}>
			<WorkCover image="/demo-cover.png" />
			<WorkTitle
				className={styles.title}
				title="Topic X: History &amp; Insights"
				abstract="Lacinia litora condimentum donec ullamcorper adipiscing a vitae dapibus dignissim erat ligula quisque malesuada. A leo nibh suspendisse metus consectetur parturient etiam aptent fermentum velit tristique leo — a adipiscing vivamus mi leo cras condimentum."
				link={{ kind: LifeEventKind.Graphics, title: "Project X Internals" }}
			/>
		</section>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
