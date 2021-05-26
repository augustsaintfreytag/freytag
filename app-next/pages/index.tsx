import Head from "next/head"
import { GetServerSideProps } from "next/types"
import { ImageFormat } from "~/api/common/library/image-request-preset"
import { imageUrlFromComponent } from "~/api/records/image/functions/image-record-data-access"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import { featuredWorkShowcaseFromApi } from "~/api/records/work-showcase-feature/functions/work-showcase-feature-data-access"
import { mappedWorkShowcaseListItemProps } from "~/api/records/work-showcase/functions/work-showcase-prop-mapping"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import BlockTag, { BlockTagAppearance } from "~/components/block-tag/block-tag"
import { brandTitle } from "~/components/brand/brand-text"
import Divider from "~/components/divider/divider"
import IndexCover from "~/components/index-cover/index-cover"
import InternalLink from "~/components/link/internal-link"
import Now from "~/components/now/now"
import LineBreak from "~/components/text-line/line-break"
import TextLine from "~/components/text-line/text-line"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import LandingLayout from "~/layouts/default/landing-layout"
import { Page, PageProps } from "~/types/page"
import { URL } from "~/utils/routing/library/url"
import styles from "./index-page.module.sass"

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
	const featureData = await featuredWorkShowcaseFromApi()
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
				<title>{brandTitle()}</title>
			</Head>
			<section className={styles.page}>
				<IndexCover src={cover} />
				<section className={styles.texts}>
					<TextLine>My name is August Saint Freytag.</TextLine>
					<TextLine>
						The renaissance is <Now />.
					</TextLine>
					<Divider />
					<TextLine>
						List the string of <InternalLink href="/life" /> events until now.
					</TextLine>
					<TextLine>
						Read and view showcases of <LineBreak />
						<InternalLink href="/work" /> in review.
					</TextLine>
					<TextLine>
						<div className={styles.line}>As a start, a feature was selected for you.</div>
					</TextLine>
				</section>
				{featureProps && (
					<section className={styles.feature}>
						<BlockTag className={styles.tag} name="Feature" appearance={BlockTagAppearance.Title} />
						<WorkListItem className={styles.item} {...featureProps} />
					</section>
				)}
				<section className={styles.texts}>
					<TextLine>
						See responsibility in the <InternalLink href="/imprint" />.
					</TextLine>
					<TextLine>
						Review how this site does not track <LineBreak />
						you in <InternalLink href="/privacy" />.
					</TextLine>
					<TextLine>Explore on your own.</TextLine>
				</section>
			</section>
		</>
	)
}

IndexPage.layout = LandingLayout

export default IndexPage
