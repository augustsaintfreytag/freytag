import type { GetServerSideProps } from "next"
import { getServerSideApiResponse } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import ImageCover from "~/components/image-cover/image-cover"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import type { URL } from "~/utils/routing/library/url"
import styles from "./themes-page.module.sass"

// Library

interface PageData {
	preview?: URL
	cover?: URL
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () =>
	getServerSideApiResponse(pageGraphicsFromApi, pageGraphics => ({
		preview: pageGraphics.themesPreview?.path,
		cover: pageGraphics.themesAsset?.path
	}))

const ThemesPage: Page<PageProps & Props> = props => {
	return (
		<>
			<section className={styles.page}>
				<h1>Theme Studio</h1>
				<ImageCover
					src={props.data?.cover}
					description="A marble statue's head with colourful plants sprouting 
					out its top, heavily stylised in an 80s vaporwave aesthetic."
				/>
			</section>
		</>
	)
}

ThemesPage.layout = DefaultLayout

export default ThemesPage
