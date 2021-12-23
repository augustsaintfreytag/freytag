import type { GetServerSideProps } from "next"
import { getServerSideResponse, getServerSideResponses } from "~/api/props/functions/server-side-props"
import { pageGraphicsFromApi } from "~/api/records/page-graphics/functions/page-graphics-data-access"
import { themesFromApi } from "~/api/records/themes/functions/theme-data-access"
import { Theme } from "~/api/records/themes/library/theme"
import Divider from "~/components/divider/divider"
import ImageCover from "~/components/image-cover/image-cover"
import InternalLink from "~/components/link/internal-link"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta from "~/components/meta/meta-tags"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemePreview from "~/components/themes/theme-preview/components/theme-preview"
import { themePreviewPropsFromTheme } from "~/components/themes/theme-preview/functions/theme-preview-prop-mapping"
import ThemesClosure from "~/components/themes/themes-closure/themes-closure"
import WorkTitle from "~/components/work/work-title/work-title"
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
			if (!pageGraphics.themesPreview || !pageGraphics.themesAsset) {
				return {}
			}

			return {
				preview: pageGraphics.themesPreview.path,
				cover: pageGraphics.themesAsset.path
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
			<Meta href={canonicalHref("/imprint")} title={pageTitle("Themes")} />
			<ThemeSprites />
			<section className={styles.page}>
				<ImageCover
					className={styles.cover}
					src={props.data?.cover}
					description="A marble statue's head with colourful plants sprouting 
					out its top, heavily stylised in an 80s vaporwave aesthetic."
				/>
				<WorkTitle
					className={styles.title}
					title="Themes"
					abstract="Colour themes designed and built for Xcode, the primary development 
					environment for Apple platforms, and Visual Studio Code, the popular extensible 
					editor for web development. A collection of distinct original palettes 
					for a new splash of colour for code of any language."
				/>
				<section className={styles.list}>
					<ol>
						{themes.map(theme => {
							const props = themePreviewPropsFromTheme(theme)

							return (
								<li>
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
