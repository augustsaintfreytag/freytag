import { GetServerSideProps } from "next/types"
import { FunctionComponent } from "react"
import { getServerSideApiResponse, getServerSideApiResponses } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import { featuredWorkShowcaseFromApi } from "~/api/records/work-showcase-feature/functions/work-showcase-feature-data-access"
import { WorkShowcase } from "~/api/records/work-showcase/library/work-showcase"
import BlockTag, { BlockTagAppearance } from "~/components/block-tag/block-tag"
import Divider from "~/components/divider/divider"
import IndexCover from "~/components/index/index-cover/index-cover"
import IndexMeta from "~/components/index/index-meta/index-meta"
import ExternalLink from "~/components/link/external-link"
import InternalLink from "~/components/link/internal-link"
import Now from "~/components/now/now"
import IndexSeo from "~/components/seo/index-seo"
import TextLine from "~/components/text-line/text-line"
import TextSpriteLine from "~/components/text-line/text-sprite-line"
import { mappedWorkShowcaseListItemProps } from "~/components/work/work-content/functions/work-showcase-prop-mapping"
import WorkListItem from "~/components/work/work-list-item/work-list-item"
import LandingLayout from "~/layouts/default/landing-layout"
import { Page, PageProps } from "~/types/page"
import { URL } from "~/utils/routing/library/url"
import styles from "./index-page.module.sass"

// Library

interface PageData {
	cover?: URL
	preview?: URL
	feature?: WorkShowcase
}

interface Props {
	data?: PageData
}

// Components

const Twitter: FunctionComponent = () => (
	<ExternalLink href="https://twitter.com/augustfreytag" name="Twitter Link" context="Index Content">
		<TextSpriteLine sprite="#Twitter Symbol">Twitter</TextSpriteLine>
	</ExternalLink>
)

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () =>
	getServerSideApiResponses<PageData>(
		getServerSideApiResponse(featuredWorkShowcaseFromApi, feature => ({ feature })),
		getServerSideApiResponse(pageGraphicsFromApi, pageGraphics => ({
			cover: pageGraphics.indexAsset?.path,
			preview: pageGraphics.indexPreview?.path
		}))
	)

const IndexPage: Page<PageProps & Props> = props => {
	const feature = props.data?.feature
	const featureProps = feature && mappedWorkShowcaseListItemProps(feature)

	return (
		<>
			<IndexMeta previewAsset={props.data?.preview} />
			<section className={styles.page}>
				<IndexCover src={props.data?.cover} />
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
						Read and view showcases of <InternalLink href="/work" /> in review.
					</TextLine>
					<TextLine>As a start, a feature was selected for you.</TextLine>
				</section>
				{featureProps && (
					<section className={styles.feature}>
						<BlockTag className={styles.tag} name="Feature" appearance={BlockTagAppearance.Title} />
						<WorkListItem className={styles.item} {...featureProps} />
					</section>
				)}
				<section className={styles.texts}>
					<TextLine>
						Follow me on <Twitter /> for announcements.
					</TextLine>
					<TextLine>
						See responsibility in the <InternalLink href="/imprint" />.
					</TextLine>
					<TextLine>
						Review how this site does not track you in <InternalLink href="/privacy" />.
					</TextLine>
				</section>
			</section>
			<IndexSeo />
		</>
	)
}

IndexPage.layout = LandingLayout

export default IndexPage
