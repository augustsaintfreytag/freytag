import Head from "next/head"
import Link from "next/link"
import { FunctionComponent } from "react"
import { GetServerSideProps } from "~/../../../../../../Volumes/Millison/Hot/Folio Freytag/freytag/app-next/node_modules/next/types"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { imageUrlFromComponent } from "~/api/records/image/functions/image-record-data-access"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import { featuredWordShowcaseFromApi } from "~/api/records/work-showcase-feature/functions/work-showcase-feature-data-access"
import { mappedWorkShowcaseListItemProps } from "~/api/records/work-showcase/functions/work-showcase-prop-mapping"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import Divider from "~/components/divider/divider"
import IndexCover from "~/components/index-cover/index-cover"
import Now from "~/components/now/now"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import LandingLayout from "~/layouts/default/landing-layout"
import { Page, PageProps } from "~/types/page"
import { PropsWithHref } from "~/types/props"
import { brandTitleText } from "~/utils/brand/functions/brand-text"
import { URL } from "~/utils/routing/library/url"
import styles from "./index-page.module.sass"

// Link Components

const IndexLink: FunctionComponent<PropsWithHref> = props => (
	<Link href={props.href}>
		<a>
			<u>{props.href}</u>
		</a>
	</Link>
)

// Library

type PageData = {
	cover?: URL
	feature?: WorkShowcase
}

type Props = {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	const featureData = await featuredWordShowcaseFromApi()
	const coverData = await pageGraphicsFromApi()

	const data: PageData = {
		cover: coverData?.indexAsset?.path,
		feature: featureData
	}

	return {
		props: { data }
	}
}

const IndexPage: Page<PageProps & Props> = props => {
	const feature = props.data?.feature
	const featureProps = feature && mappedWorkShowcaseListItemProps(feature)
	const cover = imageUrlFromComponent(props.data?.cover, ImageFormat.ExtraLarge)

	return (
		<>
			<Head>
				<title>{brandTitleText}</title>
			</Head>
			<section className={styles.page}>
				<IndexCover src={cover} />
				<section className={styles.texts}>
					<div className={styles.line}>My name is August Saint Freytag.</div>
					<div className={styles.line}>
						The renaissance is <Now />.
					</div>
					<Divider />
					<div className={styles.line}>
						List the string of <IndexLink href="/life" /> events until now.
					</div>
					<div className={styles.line}>
						Read and view showcases of <IndexLink href="/work" /> in review.
					</div>
					<div className={styles.line}>As a start, a feature was selected for you.</div>
				</section>
				<section className={styles.feature}>{featureProps && <WorkListItem {...featureProps} />}</section>
				<section className={styles.texts}>
					<div className={styles.line}>
						See responsibility in the <IndexLink href="/imprint" />.
					</div>
					<div className={styles.line}>
						Review how this site does not track you in <IndexLink href="/privacy" />.
					</div>

					<div className={styles.line}>Explore on your own.</div>
				</section>
			</section>
		</>
	)
}

IndexPage.layout = LandingLayout

export default IndexPage
