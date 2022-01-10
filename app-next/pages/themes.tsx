import type { GetServerSideProps } from "next"
import { getServerSideResponse, getServerSideResponses } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import { themesFromApi } from "~/api/records/themes/functions/theme-data-access"
import { Theme } from "~/api/records/themes/library/theme"
import ContentAnchor from "~/components/content-anchor/components/content-anchor"
import Divider from "~/components/divider/divider"
import ImageCover from "~/components/image-cover/image-cover"
import InternalLink from "~/components/link/internal-link"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemesMeta from "~/components/themes/thema-meta/themes-meta"
import ThemePreview from "~/components/themes/theme-preview/components/theme-preview"
import { themePreviewPropsFromTheme } from "~/components/themes/theme-preview/functions/theme-preview-prop-mapping"
import ThemesClosure from "~/components/themes/themes-closure/themes-closure"
import ThemesTitle from "~/components/themes/themes-title/themes-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import type { URL } from "~/utils/routing/library/url"
import styles from "./themes-page.module.sass"

// Library

interface PageData {
	preview?: URL
	cover?: URL
	themes?: Theme[]
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () =>
	getServerSideResponses<PageData>(
		getServerSideResponse(pageGraphicsFromApi, pageGraphics => {
			return {
				preview: pageGraphics.themesPreview?.path,
				cover: pageGraphics.themesAsset?.path
			}
		}),
		getServerSideResponse(themesFromApi, themes => {
			return {
				themes: themes
			}
		})
	)

const ThemesPage: Page<PageProps & Props> = props => {
	const themes = props.data?.themes ?? []

	return (
		<>
			<ThemesMeta coverAsset={props.data?.preview} />
			<ThemeSprites />
			<section className={styles.page}>
				<ImageCover
					className={styles.cover}
					src={props.data?.cover}
					description="The cover artwork for the 'Theme Studio'. It shows a ringed planet on a vibrant 
					backdrop of light to dark purple with the text 'Theme Studio' repeating itself over it."
				/>
				<ThemesTitle className={styles.title} />
				<section className={styles.list}>
					<ContentAnchor anchor="gallery" />
					<ol>
						{themes.map(theme => {
							const props = themePreviewPropsFromTheme(theme)

							return (
								<li key={`${props.name}-${props.link.id}`}>
									<InternalLink href={`/themes/${props.link.id}`}>
										<ThemePreview {...props} />
									</InternalLink>
								</li>
							)
						})}
					</ol>
				</section>
				<Divider />
				<ThemesClosure themes={themes} />
			</section>
		</>
	)
}

ThemesPage.layout = DefaultLayout

export default ThemesPage
