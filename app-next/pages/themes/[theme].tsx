import type { GetServerSideProps } from "next"
import { getServerSideApiResponseByQuery } from "~/api/props/functions/server-side-props"
import { themeFromApi } from "~/api/records/themes/functions/theme-data-access"
import { Theme } from "~/api/records/themes/library/theme"
import ImageCover from "~/components/image-cover/image-cover"
import Markdown from "~/components/markdown/markdown"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta from "~/components/meta/meta-tags"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemeColorCollection from "~/components/themes/theme-color-collection/theme-color-collection"
import ThemeMenu from "~/components/themes/theme-menu/theme-menu"
import { themeTagPropsFromTheme } from "~/components/themes/theme-preview/functions/theme-preview-prop-mapping"
import ThemeTitle from "~/components/themes/theme-title/theme-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { colorsFromEncodedData } from "~/utils/colors/functions/color-conversion"
import styles from "./theme-detail-page.module.sass"

// Data

const themeColorLabels: string[] = [
	"Background",
	"Foreground",
	"Keywords",
	"Reference Types",
	"Value Types",
	"Functions",
	"Constants",
	"Variables",
	"Strings",
	"Numbers"
]

// Library

interface PageData {
	theme: Theme
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context =>
	getServerSideApiResponseByQuery(context, "theme", themeFromApi, theme => ({ theme }))

const ThemePage: Page<PageProps & Props> = props => {
	const theme = props.data!.theme
	const tags = themeTagPropsFromTheme(theme, false)
	const cover = theme.cover?.path
	const colors = colorsFromEncodedData(theme.colors)

	return (
		<>
			<Meta href={canonicalHref(`/theme/${theme._id}`)} title={pageTitle(`${theme.name} Theme`)} />
			<ThemeSprites />
			<section className={styles.page}>
				<header>
					<ImageCover className={styles.cover} /> {/* TODO: Use `cover` value for `src` */}
					<ThemeMenu themes={{ current: theme }} />
				</header>
				<main>
					<ThemeTitle className={styles.title} text={theme.name} tags={tags} />
					<ThemeColorCollection className={styles.colors} colors={colors ?? []} labels={themeColorLabels} />
					<div className={styles.abstract}>
						<Markdown>{theme.description}</Markdown>
					</div>
				</main>
			</section>
		</>
	)
}

ThemePage.layout = DefaultLayout

export default ThemePage
