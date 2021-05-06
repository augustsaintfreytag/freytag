import { GetServerSideProps } from "next"
import Divider from "~/components/divider/divider"
import WorkContentBlock from "~/components/work/work-content-block/components/work-content-block"
import { linkPropsForShowcase } from "~/components/work/work-content-block/functions/work-content-block-data-form"
import { workContentBlockKindFromLegacy } from "~/components/work/work-content-block/library/work-content-block-kind"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { getServerSideApiRecord } from "~/utils/api/props/functions/server-side-props"
import { imageUrlFromComponent } from "~/utils/api/records/image/functions/image-record-data-access"
import { workShowcaseFromApi } from "~/utils/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/utils/api/records/work-showcase/library/work-showcase"
import styles from "./work-detail-page.module.sass"

// Library

type PageData = {
	showcase: WorkShowcase
}

type Props = {
	data?: PageData
}

// Page

function mapShowcasePageData(showcase: WorkShowcase): PageData {
	return { showcase }
}

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	return await getServerSideApiRecord<WorkShowcase, PageData>(context, "work", workShowcaseFromApi, mapShowcasePageData)
}

const WorkDetailPage: Page<PageProps & Props> = props => {
	const showcase = props.data!.showcase!
	const name = showcase.name
	const abstract = showcase.description ?? "…"
	const link = linkPropsForShowcase(showcase)

	return (
		<>
			<article className={styles.page}>
				<header>
					<WorkCover image={imageUrlFromComponent(undefined)} />
					<WorkTitle className={styles.title} title={name} abstract={abstract} link={link} />
				</header>
				<Divider className={styles.divider} />
				<main>
					{showcase.blocks?.map(block => {
						const kind = workContentBlockKindFromLegacy(block.form)
						if (!kind) {
							return undefined
						}

						return <WorkContentBlock key={block._id} kind={kind} block={block} />
					})}
				</main>
			</article>
		</>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
