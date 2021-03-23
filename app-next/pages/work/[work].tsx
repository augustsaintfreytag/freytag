import Divider from "~/components/divider/divider"
import WorkContentHeadingBlock from "~/components/work/work-content-block/work-content-heading-block"
import WorkContentImageBlock from "~/components/work/work-content-block/work-content-image-block"
import WorkContentImageColumnBlock from "~/components/work/work-content-block/work-content-image-column-block"
import WorkContentTextBlock from "~/components/work/work-content-block/work-content-text-block"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import { PageProps } from "~/pages/_app"
import type { Page } from "~/types/page"
import { LifeEventKind } from "~/utils/api/life-event/library/life-event-kind"
import { stringParameter } from "~/utils/routing/functions/route-parameters"
import styles from "./work-detail-page.module.sass"

const WorkDetailPage: Page<PageProps> = props => {
	const workId = stringParameter(props.router, "work")

	const sampleTextA = `Duis volutpat curae porta felis *ullamcorper* magnis curabitur a a nam eu ipsum suspendisse cras varius inceptos in magna mauris sit — pretium a maecenas — quis arcu. Sed neque vestibulum, est nunc condimentum adipiscing ullamcorper ad montes orci, vitae a parturient, hac ligula sociis senectus at a condimentum vulputate; Mi fringilla metus parturient habitant. Fames nibh, phasellus vestibulum a condimentum nascetur eleifend mauris condimentum sociis lacinia; litora condimentum donec ullamcorper adipiscing a vitae dapibus dignissim. Erat ligula quisque malesuada. 	

A leo nibh suspendisse metus consectetur parturient etiam, aptent fermentum velit tristique leo, a allet adipiscing vivamus mi leo cras condimentum. Vestibulum gravida dana luctus risus perem ullamcorper consectetur, orci nec gravida nisl a per elit vestibulum lian etiam, canis a vestibulum quisque.`

	const sampleTextB = `Fermentum eleifend a congue ante ac suspendisse sit consectetur, amet id hendrerit diam risus a sodales condimentum at scelerisque ligula a hac odio. Pharetra ullamcorper tellus fringilla quam adipiscing a ac egestas himenaeos quisque lacus consectetur netus potenti ad ullamcorper dignissim mus cras a lorem fringilla. Odio sem nibh eget felis consectetur a sem "dignissim dignissim" ridiculus felis facilisi vestibulum nascetur congue, leo proin nostra consequat, feugiat a est penatibus id conubia cum netus consequat.`

	return (
		<>
			<article className={styles.page}>
				<header>
					<WorkCover image="/demo-cover.png" />
					<WorkTitle
						className={styles.title}
						title="Topic X: History &amp; Insights"
						abstract="Lacinia litora condimentum donec ullamcorper adipiscing a vitae dapibus dignissim erat ligula quisque malesuada. A leo nibh suspendisse metus consectetur parturient etiam aptent fermentum velit tristique leo — a adipiscing vivamus mi leo cras condimentum."
						link={{ kind: LifeEventKind.Graphics, title: "Project X Internals" }}
					/>
				</header>
				<Divider className={styles.divider} />
				<main>
					<WorkContentTextBlock text={sampleTextA} />
					<WorkContentImageBlock
						src="/showcase-content-block.png"
						caption="Essential Irish Palm Trees (Digital)"
					/>
					<WorkContentHeadingBlock text="The Sub Menu Button" />
					<WorkContentTextBlock text={sampleTextB} />
					<WorkContentImageColumnBlock
						collection={[
							{ src: "/work-content-square-01.jpg", caption: "Square One" },
							{ src: "/work-content-square-02.jpg", caption: "Square Next" },
							{ src: "/work-content-square-03.jpg", caption: "Square Last" }
						]}
					/>
				</main>
			</article>
		</>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
