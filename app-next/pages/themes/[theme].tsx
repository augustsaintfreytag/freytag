import type { GetServerSideProps } from "next"
import { RecordError } from "~/api/common/errors/record-error"
import { getServerSideResponseByQuery, isServerSidePropsResult, serverSideResultNotFound } from "~/api/props/functions/server-side-props"
import { themeFromApi } from "~/api/records/themes/functions/theme-data-access"
import { intermediateThemeFileFromApi } from "~/api/records/themes/functions/theme-file-data-access"
import { themePackageFromTheme } from "~/api/records/themes/functions/theme-package-decoding"
import { Theme } from "~/api/records/themes/library/theme"
import { ThemeEditorFormat } from "~/api/records/themes/library/theme-editor-format"
import ImageCover from "~/components/image-cover/image-cover"
import Markdown from "~/components/markdown/markdown"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta from "~/components/meta/meta-tags"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemeCodePreview from "~/components/themes/theme-code-preview/theme-code-preview"
import ThemeColorCollection from "~/components/themes/theme-color-collection/theme-color-collection"
import ThemeMenu from "~/components/themes/theme-menu/theme-menu"
import { themeTagPropsFromTheme } from "~/components/themes/theme-preview/functions/theme-preview-prop-mapping"
import ThemeTitle from "~/components/themes/theme-title/theme-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { colorsFromEncodedData } from "~/utils/colors/functions/color-conversion"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./theme-detail-page.module.sass"

// Library

interface PageData {
	theme: Theme
	file?: IntermediateTheme
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context => {
	const resultFromQuery = await getServerSideResponseByQuery<Theme, PageData>(context, "theme", themeFromApi, theme => ({ theme }))

	if (!isServerSidePropsResult(resultFromQuery)) {
		return resultFromQuery
	}

	const theme = resultFromQuery.props.data.theme

	try {
		const themePackage = themePackageFromTheme(theme, ThemeEditorFormat.Intermediate)

		if (!themePackage) {
			throw new RecordError(`Theme package does not have an intermediate theme package or package URL.`)
		}

		const intermediateThemeFile = await intermediateThemeFileFromApi(themePackage)
		resultFromQuery.props.data.file = intermediateThemeFile

		return resultFromQuery
	} catch (error) {
		console.error(`Could not fetch intermediate theme package for theme '${theme.name}'.`, error)
		return serverSideResultNotFound
	}
}

const ThemePage: Page<PageProps & Props> = props => {
	const theme = props.data!.theme
	const intermediateThemeFile = props.data!.file

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
					<ThemeColorCollection className={styles.colors} colors={colors ?? []} />
					<div className={styles.abstract}>
						<Markdown>{theme.description}</Markdown>
					</div>
					<ThemeCodePreview className={styles.demo} theme={intermediateThemeFile} />
				</main>
			</section>
		</>
	)
}

ThemePage.layout = DefaultLayout

export default ThemePage
