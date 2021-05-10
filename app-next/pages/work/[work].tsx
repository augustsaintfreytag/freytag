import { GetServerSideProps } from "next"
import Head from "next/head"
import { useMemo } from "react"
import { dateFromTimestamp } from "~/api/common/functions/date-conversion"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { getServerSideApiRecord } from "~/api/props/functions/server-side-props"
import { imageUrlFromComponent } from "~/api/records/image/functions/image-record-data-access"
import { workShowcaseFromApi } from "~/api/records/work-showcase/functions/work-showcase-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import Divider from "~/components/divider/divider"
import WorkContentBlock from "~/components/work/work-content-block/components/work-content-block"
import { linkPropsForShowcase } from "~/components/work/work-content-block/functions/work-content-block-data-form"
import { workContentBlockKindFromLegacy } from "~/components/work/work-content-block/library/work-content-block-kind"
import WorkCover from "~/components/work/work-cover/work-cover"
import WorkTitle from "~/components/work/work-title/work-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { DateFormatStyle, formattedDate } from "~/utils/date/functions/date-formatting"
import { pageTitle } from "~/utils/title/functions/page-title"
import styles from "./work-detail-page.module.sass"

// Sub Components

const WorkDivider = () => <Divider className={styles.divider} />

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
	const cover = imageUrlFromComponent(showcase.titleImage?.path, ImageFormat.ExtraLarge)
	const abstract = showcase.description ?? "…"
	const link = linkPropsForShowcase(showcase)

	const metadata = useMemo(() => {
		const created = dateFromTimestamp(showcase._created)
		const modified = showcase._modified && dateFromTimestamp(showcase._modified)

		return {
			created: formattedDate(created, DateFormatStyle.MonthAndYear),
			modified: modified && formattedDate(modified, DateFormatStyle.MonthAndYear)
		}
	}, [showcase._created, showcase._modified])

	return (
		<>
			<Head>
				<title>{pageTitle(name)}</title>
			</Head>
			<article className={styles.page}>
				<header>
					<WorkCover image={cover} />
					<WorkTitle className={styles.title} title={name} abstract={abstract} link={link} />
				</header>
				<WorkDivider />
				<main>
					{showcase.blocks?.map(block => {
						const kind = workContentBlockKindFromLegacy(block.form)
						if (!kind) {
							return undefined
						}

						return <WorkContentBlock key={block._id} kind={kind} block={block} />
					})}
					<WorkDivider />
					<WorkContentBlock>
						<p>Initially published {metadata.created}, by August Saint Freytag.</p>
					</WorkContentBlock>
				</main>
			</article>
		</>
	)
}

WorkDetailPage.layout = DefaultLayout

export default WorkDetailPage
